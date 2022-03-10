import {Link, NavLink} from 'react-router-dom'
import '../Style/NavBar.css'
import {isActiveLinkStyle} from '../Style/Style'
import {useContext, useEffect, useState} from 'react'
import LoginForm from './LoginForm'
import {ModalContext} from '../Context/ModalState'
import MenuIcon from '@mui/icons-material/Menu'
import {UserContext} from '../Context/UserState'
import {getCookie, logout} from '../Helpers/Auth'
import {authUserURL} from '../backend'


const NavBar = () => {
    const {setModal, setModalContent} = useContext(ModalContext)
    const [showMenu, setShowMenu] = useState(false)

    const {authUser, setAuthUser} = useContext(UserContext)
    const {first_name, isAuth} = authUser


    const openLoginModal = () => {
        setModal(true)
        setModalContent(<LoginForm/>)
    }

    const csrftoken = getCookie('csrftoken')
    const isAuthenticated = () => {

        if (csrftoken !== null) {
            fetch(authUserURL, {
                method: 'GET',
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => {
                    setAuthUser({
                        ...authUser,
                        isAuth: true,
                        first_name: data.first_name,
                        username: data.username,

                    })
                })
                .catch(error => {
                    document.cookie = 'csrftoken=; expires=Thu, 01-Jan-1970 00:00:01 GMT'
                })
        }
    }

    useEffect(() => {
        isAuthenticated()
    }, [])

    return (
        <>
            <nav className='bg-[#FFFFFF]'>
                <div className='container mx-auto'>
                    <div className='flex mx-10 justify-between items-center'>
                        {/*logo*/}
                        <div className='font-bold text-[34px]'>
                            <Link to='/'>
                                Crypto Tracker
                            </Link>
                        </div>

                        {/*nav*/}
                        <div className='hidden lg:flex space-x-32 text-lg'>
                            <NavLink to='/'
                                     style={({isActive}) => {
                                         if (isActive) return isActiveLinkStyle
                                         else return null
                                     }}
                            >Portfolio </NavLink>

                            <NavLink to='/transaction'
                                     style={({isActive}) => {
                                         if (isActive) return isActiveLinkStyle
                                         else return null
                                     }}
                            >Transaction</NavLink>

                            <NavLink to='/watchlist'
                                     style={({isActive}) => {
                                         if (isActive) return isActiveLinkStyle
                                         else return null
                                     }}
                            >Watchlist</NavLink>
                        </div>

                        {/*authentication*/}
                        {
                            isAuth ?
                                <div>
                                    <span>{first_name}</span>
                                    <button onClick={logout}>Logout</button>
                                </div>
                                :
                                <div className='hidden lg:flex cursor-pointer' onClick={openLoginModal}>
                                    Login
                                </div>
                        }

                        {/*menu icon*/}
                        <div className='lg:hidden cursor-pointer'>
                            <MenuIcon onClick={() => setShowMenu(!showMenu)}/>
                        </div>
                    </div>

                    {/*mobile menu*/}
                    {
                        showMenu ?
                            <div className='lg:hidden mx-10 mobile_menu'>
                                <NavLink to='/'
                                         className={({isActive}) => {
                                             if (isActive) return 'text-[#3861FB] block py-1'
                                             else return 'block py-1'
                                         }}
                                >Portfolio </NavLink>
                                <NavLink to='/transaction'
                                         className={({isActive}) => {
                                             if (isActive) return 'text-[#3861FB] block py-1'
                                             else return 'block py-1'
                                         }}
                                >Transaction</NavLink>
                                <NavLink to='/watchlist'
                                         className={({isActive}) => {
                                             if (isActive) return 'text-[#3861FB] block py-1'
                                             else return 'block py-1'
                                         }}
                                >Watchlist</NavLink>
                                {
                                    isAuth ?
                                        <div>
                                            Logout
                                        </div>
                                        :
                                        <div className='cursor-pointer hover:text-[#3861FB]'
                                             onClick={openLoginModal}>
                                            Login
                                        </div>
                                }

                            </div>
                            : null
                    }
                </div>
            </nav>
        </>
    )
}
export default NavBar

// bootstrap navbar

// <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: '#FFFFFF'}}>
//     <div className='container'>
//         <Link to='/' className='navbar-brand' style={{color: '#000000'}}>
//             <b>Crypto Tracker</b>
//         </Link>
//         <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
//                 data-bs-target='#navmenu'>
//             <span className='navbar-toggler-icon'/>
//         </button>
//         <div className='collapse navbar-collapse' id='navmenu'>
//
//             <ul className='navbar-nav mx-auto'>
//                 <li className='nav-item'>
//                     <NavLink to='/' className='nav-link'
//                              style={({isActive}) => {
//                                  if (isActive) return isActiveLinkStyle
//                                  else return linkStyle
//                              }}
//                     >Portfolio </NavLink>
//                 </li>
//                 <li className='nav-item'>
//                     <NavLink to='/transaction' className='nav-link'
//                              style={({isActive}) => {
//                                  if (isActive) return isActiveLinkStyle
//                                  else return linkStyle
//                              }}
//                     >Transaction</NavLink>
//                 </li>
//                 <li className='nav-item'>
//                     <NavLink to='/watchlist' className='nav-link'
//                              style={({isActive}) => {
//                                  if (isActive) return isActiveLinkStyle
//                                  else return linkStyle
//                              }}
//                     >Watchlist</NavLink>
//                 </li>
//             </ul>
//
//             <ul className='navbar-nav'>
//                 <li className='nav-item'
//                     onClick={openLoginModal}
//                     style={{cursor: 'pointer'}}>
//                     Login
//                 </li>
//             </ul>
//         </div>
//     </div>
// </nav>