import React from 'react';
import {Link} from "react-router-dom";


const Countries = (props) => {

    const {countries} = props
    // console.log('countries: ', countries)
    const filteredCountries = countries.filteredCountries
    return (
        <>

            <section id='countries'>
                {filteredCountries.map((country, key) => {
                    const name = country.name.common
                    return (
                        <Link key={key} to={`/countries/${name}`}>
                            <div className='country'>
                                <img className='flag' src={country.flags.png} alt={country.name.common}/>
                                <div className="country-info">
                                    <h3>{country.name.common}</h3>
                                    <p><span className='text-bold'>Population:</span> {country.population}</p>
                                    <p><span className='text-bold'>Region:</span> {country.region}</p>
                                    <p><span className='text-bold'>Capital:</span> {country.capital}</p>

                                </div>
                            </div>
                        </Link>
                    )
                })}
            </section>

        </>
    );
}

export default Countries;