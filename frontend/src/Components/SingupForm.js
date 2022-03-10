import {inputBoxStyle, buttonStyle, inputLabelStyle, checkboxStyle, checkboxLabelStyle} from '../Style/Style'
import {useContext} from 'react'
import {ModalContext} from '../Context/ModalState'
import LoginForm from './LoginForm'
import InputBox from './Buttons/InputBox'
import SubmitButton from './Buttons/SubmitButton'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ModalHeading from './Modals/ModalHeading'

const SignupForm = () => {
    const {setModalContent} = useContext(ModalContext)

    return (
        <form action='' className='' method='post'>

            <ModalHeading>Create account</ModalHeading>

            <div className='grid grid-cols-2 gap-[32px]'>
                <InputBox lable='First Name' placeholder='First Name' type='text' id='first_name'/>
                <InputBox lable='Last Name' placeholder='Last Name' type='text' id='last_name'/>
            </div>

            <InputBox lable='E-mail' placeholder='Email address' type='text' id='email'/>

            <InputBox lable='Password' placeholder='Password' type='password' id='password'/>

            <div className='ml-[8px] flex items-center'>
                <span>
                    <CheckBoxOutlineBlankIcon fontSize='medium'/>
                </span>
                <span className='ml-[8px]'>
                    I agree with all the <b>Terms</b>  & <b>Privacy Policy</b>
                </span>
            </div>

            <SubmitButton>Create account</SubmitButton>

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