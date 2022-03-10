import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Home from './Pages/Home'
import {BrowserRouter, Routes, Route, Navigate, Link, Outlet, useParams, NavLink} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Transactions from './Pages/Transactions'
import Watchlist from './Pages/Watchlist'
import Modal from './Components/Modals/Modal'
import {ModalState} from './Context/ModalState'
import UserState from './Context/UserState'

ReactDOM.render(
    <BrowserRouter>
        <UserState>
            <ModalState>
                <Modal/>
                <NavBar/>
                <Routes>
                    <Route path='/' exact element={<Home/>}/>
                    <Route path='/transaction' exact element={<Transactions/>}/>
                    <Route path='/watchlist' exact element={<Watchlist/>}/>
                </Routes>
            </ModalState>
        </UserState>
    </BrowserRouter>,
    document.getElementById('root'),
)

reportWebVitals()
