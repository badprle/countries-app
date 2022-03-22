import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Select} from "react-functional-select";

const Filters = (props) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const {filterBySearch, filterByRegion} = props
    const selectOptions = [
        {value: '', label: 'All'},
        {value: 'Africa', label: 'Africa'},
        {value: 'Americas', label: 'America'},
        {value: 'Asia', label: 'Asia'},
        {value: 'Europe', label: 'Europe'},
        {value: 'Oceania', label: 'Oceania'}
    ]

    const onOptionChange = (value) => {
        //console.log('value:', value)
        props.filterByRegion(value.value)
    }

    return (

        <section id='filters'>
            <div className="search-filter-container">
                <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass}/>
                <input
                    onChange={(e) => filterBySearch(e.target.value)}
                    type='search' name='search' id='search' placeholder='Search for a country...'/>
            </div>

            <div className={`custom-select ${props.darkMode ? 'dark' : ''}`}>
                <Select
                    placeholder='Filter by Region'
                    isSearchable={false}
                    options={selectOptions}
                    onOptionChange={onOptionChange}
                />
            </div>
        </section>
    )

}

export default Filters