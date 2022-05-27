import {useContext, useState} from 'react'
import {ModalContext} from '../Context/ModalState'
import LoginForm from './LoginForm'
import InputBox from './Buttons/InputBox'
import SubmitButton from './Buttons/SubmitButton'
import ModalHeading from './Modals/ModalHeading'
import {singup} from '../Helpers/Auth'

const SignupForm = () => {
    const {setModalContent} = useContext(ModalContext)

    const [values, setValues] = useState({
        first_name: 'Vaishali',
        last_name: 'Bansal',
        email: 'Vaishalibansal071@gmail.com',
        username: 'Vaishalibansal071',
        password: 'qwerty',
        error: '',
        success: false,
    })

    const {first_name, last_name, email, password, username, error} = values

    const handleErrorMessage = () => {
        return (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"'
                 style={{display: error ? '' : 'none'}}
            >
                Check all field again
            </div>
        )
    }


    const handleChange = name => (event) => {
        setValues({
                ...values,
                error: false,
                [name]: event.target.value,
            },
        )
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        singup({first_name, last_name, email, password, username})
            .then(data => {
                console.log('DATA', data)
                if (data.email === email) {
                    setValues({
                        ...values,
                        first_name: '',
                        last_name: '',
                        email: '',
                        username: '',
                        password: '',
                        error: false,
                        success: true,
                    })
                } else {
                    setValues({
                        ...values,
                        error: true,
                        success: false,
                    })
                }
            })
            .catch(error => console.log(error))
    }


    const SignupForm = () => {
        return (
            <form action='' className='' method='post'>
                {handleErrorMessage()}
                <ModalHeading>Create account</ModalHeading>

                <div className='grid grid-cols-2 gap-[32px]'>
                    <InputBox label='First Name' placeholder='First Name' type='text' id='first_name'
                              onChange={handleChange('first_name')}
                              value={first_name}/>
                    <InputBox label='Last Name' placeholder='Last Name' type='text' id='last_name'
                              onChange={handleChange('last_name')}
                              value={last_name}/>
                </div>

                <InputBox label='E-mail' placeholder='Email address' type='text' id='email'
                          onChange={handleChange('email')}
                          value={email}/>
                <InputBox label='Username' placeholder='Username' type='text' id='username'
                          onChange={handleChange('username')}
                          value={username}/>

                <InputBox label='Password' placeholder='Password' type='password' id='password'
                          onChange={handleChange('password')}
                          value={password}/>

                <div className='ml-[8px] flex items-center'>
                <span>
                    <input type='checkbox'/>
                </span>
                    <span className='ml-[8px]'>
                    I agree with all the <b>Terms</b>  & <b>Privacy Policy</b>
                </span>
                </div>

                <SubmitButton onClick={handleSubmit}>Create account</SubmitButton>

                <div>
                    Already have an account?
                    <span className='text-[#15825E] font-bold cursor-pointer'
                          onClick={() => setModalContent(<LoginForm/>)}>
                 Log in
                </span>
                </div>

            </form>
        )
    }

    return (
        SignupForm()
    )
}

export default SignupForm

// Bootstrap

// <div className='row'>
//              <div className='form-group col-md-6'>
//                  <label htmlFor='first_name' className='label' style={inputLabelStyle}>First Name</label>
//                  <input
//                      id='first_name'
//                      className='form-control' type='text'
//                      placeholder='First name'
//                      style={inputBoxStyle}
//                  />
//              </div>
//
//              <div className='form-group col-md-6'>
//                  <label htmlFor='last_name' className='label' style={inputLabelStyle}>Last Name</label>
//                  <input
//                      id='last_name' className='form-control' type='text' placeholder='Last name'
//                      style={inputBoxStyle}
//                  />
//              </div>
//          </div>
//
//          <div className='form-group'>
//              <label htmlFor='email' className='label' style={inputLabelStyle}>Email</label>
//              <input
//                  id='email'
//                  className='form-control' type='email' placeholder='Email address'
//                  style={inputBoxStyle}
//              />
//          </div>
//
//
//          <div className='form-group'>
//              <label htmlFor='password' className='label' style={inputLabelStyle}>Password</label>
//              <input
//                  id='password'
//                  className='form-control' type='password' placeholder='Password'
//                  style={inputBoxStyle}
//              />
//          </div>
//
//          <div className='form-group'>
//              <input type='checkbox' style={checkboxStyle} id='checkbox'/>
//              <label htmlFor='checkbox' style={checkboxLabelStyle}>
//                  I agree with all the <b> Terms</b> & <b>Privacy Policy</b>
//              </label>
//          </div>
//
//          <div>
//              <button className='btn btn-primary btn-block w-100' style={buttonStyle}>
//                  Create account
//              </button>
//          </div>
//
//          <div className='d-flex mt-4'>
//              Already an account?
//              <span className='fw-bold' style={{cursor: 'pointer', color: '#15825E'}}
//                    onClick={() => setModalContent(<LoginForm/>)}>
//               Log in
//              </span>
//          </div>