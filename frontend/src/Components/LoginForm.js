import {useContext, useState} from 'react'
import {ModalContext} from '../Context/ModalState'
import SignupForm from './SingupForm'
import InputBox from './Buttons/InputBox'
import SubmitButton from './Buttons/SubmitButton'
import ModalHeading from './Modals/ModalHeading'
import {Login} from '../Helpers/Auth'


const LoginForm = () => {
    const {setModalContent} = useContext(ModalContext)

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })
    const {username, password} = credentials

    const handleSubmit = e => {
        e.preventDefault()
        Login({username, password})
            .then(() => window.location.reload())
    }

    const handleOnChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            <form action='' method='post' className=''>

                <ModalHeading>Login</ModalHeading>

                <InputBox label='E-mail' placeholder='Email address' type='text' id='username'
                          onChange={handleOnChange}/>

                <InputBox label='Password' placeholder='Password' type='password' id='password'
                          onChange={handleOnChange}/>

                <SubmitButton onClick={handleSubmit}>Login</SubmitButton>

                <div>
                    New here?
                    <span className='text-[#15825E] font-bold cursor-pointer'
                          onClick={() => setModalContent(<SignupForm/>)}>
                 Create account
                </span>
                </div>
            </form>

        </>
    )
}

export default LoginForm


//     <form action='' method='post'>
//
// <h2 className='mb-4 fw-bold'>Login</h2>
//
// <div className='form-group'>
// <label htmlFor='email' className='label' style={inputLabelStyle}>E-mail</label>
// <input
//                         id='email'
//                         className='form-control' style={inputBoxStyle} type='text'
//                         placeholder='Email address'
//                         name='email'
//                     />
//                 </div>
//
//                 <div className='form-group'>
//
//                     <span className='float-start'>
//                     <label htmlFor='password' className='label' style={inputLabelStyle}>Password</label>
//                     </span>
//
//                     <span className='float-end'>
//                     <label style={{cursor: 'pointer', color: '#7B7676'}}>Forgot Password?</label>
//                     </span>
//
//                     <input
//                         id='password'
//                         className='form-control' style={inputBoxStyle} type='password' placeholder='Password'
//                         name='password'/>
//                 </div>
//
//                 <div>
//                     <button className='btn btn-primary btn-block w-100'
//                             style={buttonStyle}>
//                         Log In
//                     </button>
//                 </div>
//             </form>
//
//             <br/>
//
//             <div>
//                 New here?
//                 <span className='fw-bold' style={{cursor: 'pointer', color: '#15825E'}}
//                       onClick={() => setModalContent(<SignupForm/>)}>
//                  Create account
//                 </span>
//             </div>