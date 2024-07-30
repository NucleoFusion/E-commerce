import React from "react";
import LogForm from "./LogForm"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Layout from "./Layout";

function App(){
    return (
        <Router>
            <Routes>
                <Route element={<Layout />} >
                    <Route path='/' element={<LogForm name='Login' />} />
                    <Route path='/home' element={<Home/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;