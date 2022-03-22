import React, {useEffect, useState} from "react";
import Filters from "./Filters";
import Countries from "./Countries";
import {Link} from "react-router-dom";
import country from "./Country";

const CountriesList = (props) => {
    const [countries, setCountries] = useState({
        allCountries: [],
        filteredCountries: []
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [filterRegion, setFilterRegion] = useState('')
    const url = 'https://restcountries.com/v3.1/all'


    const fetchCountries = async () => {


    }
    useEffect(async () => {
        //console.log('runUseEffect')
        const response = await fetch(url)
        const result = await response.json()

        const sortedResult = result.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries({
            allCountries: sortedResult,
            filteredCountries: result
        })
    }, [])

    const filterBySearch = async (query) => {
        await setSearchQuery(query)
        filterCountries(query, filterRegion)
    }

    const filterByRegion = async (region) => {
        await setFilterRegion(region)
        filterCountries(searchQuery, region)
    }

    const filterCountries = async (query, region) => {
        const allCountries = [...countries.allCountries]

        //console.log('query: ', query.toLowerCase())

        //Filtering by region
        const filtered = allCountries.filter(country => {
            return country.region.toLowerCase().includes(region.toLowerCase())
        })

        //Filtering by search query
        const filteredFinal = filtered.filter(country => {
                return country.name.common.toLowerCase().includes(query.toLowerCase())
            }
        )

        const sortedFiltered = filteredFinal.sort((a, b) => a.name.common.localeCompare(b.name.common))

        setCountries({
            allCountries: countries.allCountries,
            filteredCountries: sortedFiltered
        })
    }

    return (
        <div className="content-container">
            <Filters
                filterBySearch={filterBySearch}
                darkMode={props.darkMode}
                filterByRegion={filterByRegion}
            />
            <Countries
                countries={countries}
            />
        </div>
    )
}
export default CountriesList