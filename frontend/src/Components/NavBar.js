import {Link, NavLink} from 'react-router-dom'
import '../Style/NavBar.css'
import {linkStyle, isActiveLinkStyle} from '../Style/Style'

const NavBar = () => {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: '#FFFFFF'}}>
                <div className='container'>
                    <Link to='/' className='navbar-brand' style={{color: '#000000'}}>
                        <b>Crypto Tracker</b>
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                            data-bs-target='#navmenu'>
                        <span className='navbar-toggler-icon'/>
                    </button>
                    <div className='collapse navbar-collapse' id='navmenu'>

                        <ul className='navbar-nav mx-auto'>
                            <li className='nav-item'>
                                <NavLink exact to='/' clasName='nav-link'
                                         style={({isActive}) => {
                                             if (isActive) return isActiveLinkStyle
                                             else return linkStyle
                                         }}
                                >Portfolio </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink exact to='/transaction' clasName='nav-link'
                                         style={({isActive}) => {
                                             if (isActive) return isActiveLinkStyle
                                             else return linkStyle
                                         }}
                                >Transaction</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink exact to='/watchlist' clasName='nav-link'
                                         style={({isActive}) => {
                                             if (isActive) return isActiveLinkStyle
                                             else return linkStyle
                                         }}
                                >Watchlist</NavLink>
                            </li>
                        </ul>

                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                Login
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavBar