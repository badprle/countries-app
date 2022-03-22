import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import CountriesList from "./components/CountriesList";
import Country from "./components/Country";
import {Routes, Route} from 'react-router-dom';

const App = () => {
    const [darkMode, toggleDarkMode] = useState(false)


    return (
        <div className={`${darkMode ? 'dark-mode container' : 'container'}`}>
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}/>
            <Routes>
                <Route path='/' element={<CountriesList
                darkMode={darkMode}
                />}/>
                <Route path='/countries/:name' element={<Country/>}/>
            </Routes>

        </div>
    );
}

export default App;
