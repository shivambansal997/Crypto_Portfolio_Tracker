import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Home from './Pages/Home'
import {BrowserRouter, Routes, Route, Navigate, Link, Outlet, useParams, NavLink} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Transactions from './Pages/Transactions'
import Watchlist from './Pages/Watchlist'

ReactDOM.render(
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/transaction' exact element={<Transactions/>}/>
            <Route path='/watchlist' exact element={<Watchlist/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
)

reportWebVitals()
