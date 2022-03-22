import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon as faMoonRegular} from "@fortawesome/free-regular-svg-icons" ;
import {faMoon as faMoonSolid} from "@fortawesome/free-solid-svg-icons" ;

const Header = (props) => {
    const {darkMode, toggleDarkMode} = props
    return (
        <header id='header'>
            <div className="header-content">
                <h1>Where in the world</h1>
                <div className='dark-mode-toggle' onClick={() => toggleDarkMode(!darkMode)}>
                    {darkMode ?
                        <FontAwesomeIcon className='moon-icon' icon={faMoonSolid}/> :
                        <FontAwesomeIcon className='moon-icon' icon={faMoonRegular}/>}
                    Dark Mode
                </div>
            </div>
        </header>
    )
}

export default Header;