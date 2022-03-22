import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import GoogleMapReact from 'google-map-react';


const Country = () => {


    const [countryData, setCountryData] = useState([])
    const [borderCountries, setBorderCountries] = useState([])
    const [map, toggleMap] = useState(false)
    const {name} = useParams()
    const navigate = useNavigate()
    const AnyReactComponent = ({text}) => <div>{text}</div>;

    const [latLng, setLatLng] = useState({
        lat: '',
        lng: ''
    })
    const navigateToBorderCountry = async (borderCountryName) => {
        toggleMap(false)
        //console.log('border country name: ', borderCountryName)
        navigate(`/countries/${borderCountryName}`)
        const response = await fetch(`https://restcountries.com/v3.1/name/${borderCountryName}?fullText=true`)
        const countryData = await response.json()
        setCountryData(countryData[0])
        setLatLng({
            lat: countryData[0].latlng[0],
            lng: countryData[0].latlng[1]
        })
        const borderCountryCodes = countryData[0].borders
        const borderCountriesFullResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountryCodes.map(code => {
            return code
        })}`)
        const borderCountries = await borderCountriesFullResponse.json()
        //console.log('borderCountriesFull: ', borderCountries)
        setBorderCountries(borderCountries)
    }

    useEffect(async () => {

        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        const countryData = await response.json()
        await setCountryData(countryData[0])

        setLatLng({
            lat: countryData[0].latlng[0],
            lng: countryData[0].latlng[1]
        })
        if (countryData[0].borders) {
            const borderCountryCodes = await countryData[0].borders
            const borderCountriesFullResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountryCodes.map(code => {
                return code
            })}`)
            const borderCountries = await borderCountriesFullResponse.json()
            //console.log('borderCountriesFull: ', borderCountries)
            setBorderCountries(borderCountries)
        }
    }, [])
    // console.log('countryData:', countryData)

    const shortKey = countryData?.name?.nativeName ? Object.keys(countryData?.name?.nativeName)[0] : ''
    //console.log('shortKey: ', shortKey)


    return (
        <div className='country-data-container'>
            <Link to='/'>
                <button className='back-btn'>
                    <FontAwesomeIcon className='back-icon' icon={faArrowLeft}/>
                    Back
                </button>
            </Link>
            <div className="country-data">
                {countryData && shortKey && borderCountries ?
                    <>
                        {
                            countryData?.flags ?
                                <img src={countryData.flags.svg} alt={name}/>
                                :
                                ''
                        }


                        <div className="country-data-details">
                            <h2>{countryData.name.common}</h2>
                            < div className='country-details-info'>
                                <div>
                                    <p><span className='text-semi-bold'>Native
                                        Name: </span> {countryData.name.nativeName[`${shortKey}`].official}
                                    </p>
                                    <p><span className='text-semi-bold'>Population: </span>{countryData.population}</p>
                                    <p><span className='text-semi-bold'>Region: </span>{countryData.region}</p>
                                    <p><span className='text-semi-bold'>Sub Region: </span>{countryData.subregion}</p>
                                    <p><span className='text-semi-bold'>Capital: </span>{countryData.capital[0]}</p>

                                </div>
                                <div>
                                    <p><span className='text-semi-bold'>Top Level Domain: </span>{countryData.tld[0]}
                                    </p>
                                    <p><span
                                        className='text-semi-bold'>Currencies: </span>{Object.keys(countryData.currencies).map((key, index) => {
                                        const numberOfCurrencies = Object.keys(countryData.currencies).length

                                        return (
                                            index === numberOfCurrencies - 1 ?
                                                countryData.currencies[key].name
                                                :
                                                countryData.currencies[key].name + ', '
                                        )
                                    })}</p>
                                    <p><span className='text-semi-bold'>Languages: </span>
                                        {Object.keys(countryData.languages).map((key, index) => {
                                            const numberOfLanguages = Object.keys(countryData.languages).length

                                            return (

                                                index === numberOfLanguages - 1 ?
                                                    countryData.languages[key]
                                                    :
                                                    countryData.languages[key] + ', '
                                            )
                                        })
                                        }
                                    </p>
                                </div>

                            </div>
                            <button
                                onClick={() => toggleMap(!map)}
                            >
                                {!map ?
                                    "View on Map" : "Close Map"
                                }
                            </button>
                            {borderCountries.length > 0 ?
                                <div className="border-countries-container">
                                    <p className='text-semi-bold'>Border countries: </p>
                                    <div className="border-country-buttons">
                                        {

                                            borderCountries.map((borderCountry) => {
                                                return (

                                                    <button key={borderCountry.name.common}
                                                            onClick={() => navigateToBorderCountry(borderCountry.name.common)}>
                                                        {borderCountry.name.common}
                                                    </button>

                                                )
                                            })
                                        }

                                    </div>

                                </div>
                                :
                                ''}

                        </div>

                    </>
                    :
                    ''
                }
            </div>
            {map ?

                <div className='map'>
                    <p className='text-semi-bold'>Location on map:</p>
                    <GoogleMapReact
                        defaultCenter={latLng}
                        defaultZoom={5}
                    >

                    </GoogleMapReact>
                </div>
                : ''
            }
        </div>
    )
}
export default Country