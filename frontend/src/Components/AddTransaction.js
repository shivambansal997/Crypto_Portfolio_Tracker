import '../Style/Form.css'
import InputBox from './Buttons/InputBox'
import SubmitButton from './Buttons/SubmitButton'
import ModalHeading from './Modals/ModalHeading'
import {getCookie} from '../Helpers/Auth'
import {transactionURL} from '../backend'
import {useState} from 'react'
import SearchBox from './SearchBox'

const AddTransaction = () => {

    const [values, setValues] = useState({
        type: 'Sell',
        price_usd: '2343',
        quantity: '7',
        platform_id: '01232309-e9f4-49ca-9ba4-ab600ebd31e3',
        description: 'test',
        date: '2022-05-25',
        error: '',
        success: false,
    })

    const {type, price_usd, quantity, platform_id, description, date, error} = values

    const handleChange = name => (event) => {
        setValues({
                ...values,
                error: false,
                [name]: event.target.value,
            },
        )
    }

    const handleAddTransaction = () => {
        const crypto_id = document.getElementById('search_box').getAttribute('data-crypto-id')
        const data = {
            crypto_id: crypto_id,
            type: type,
            price_usd: price_usd,
            quantity: quantity,
            platform_id: platform_id,
            description: description,
            date: date,
        }
        console.log(data)
        fetch(transactionURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.log('error', error))
    }


    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        handleAddTransaction()
    }
    return (
        <form action='' className='' method='post'>

            <ModalHeading>Add Transaction</ModalHeading>

            {/*<InputBox label='Coin' placeholder='Bitcoin' type='select' id='coin'/>*/}

            <SearchBox placeholder='Bitcoin' label='Coin'/>


            <div className='grid grid-cols-2 gap-[32px]'>
                <InputBox label='Type' placeholder='' id='type'
                          onChange={handleChange('type')}
                          value={type}
                />
                <InputBox label='Price ($)' placeholder='' type='number' id='price'
                          onChange={handleChange('price_usd')}
                          value={price_usd}
                />
            </div>

            <div className='grid grid-cols-2 gap-[32px]'>
                <InputBox label='Quantity' placeholder='' type='number' id='quantity'
                          onChange={handleChange('quantity')}
                          value={quantity}
                />
                <InputBox label='Date' placeholder='' type='date' id='date'
                          onChange={handleChange('date')}
                          value={date}
                />
            </div>

            <InputBox label='Platform or Wallet' placeholder='Binance' type='text' id='platform'/>

            <div>
                <div>
                    <label className='text-[16px] font-bold ml-[8px]'>Note</label>
                </div>
                <textarea className='w-full border border-[#919191] focus:outline-none rounded-[10px] p-3'
                          placeholder='write a note here'
                          onChange={handleChange('description')}
                          value={description}
                />
            </div>

            <SubmitButton onClick={handleSubmit}>Add Transaction</SubmitButton>

        </form>

    )
}
export default AddTransaction

// Boostrap

// <h2 className='mb-4 fw-bold'>Add Transaction</h2>
//
//            <div className='form-group'>
//                <label htmlFor='coin' className='label' style={inputLabelStyle}>Coin</label>
//                <input
//                    id='coin'
//                    className='form-control' type='email'
//                    style={inputBoxStyle}
//                />
//            </div>
//
//            <select>
//                <option selected>Open this select menu</option>
//                <option value='1'>One</option>
//                <option value='2'>Two</option>
//                <option value='3'>Three</option>
//            </select>
//
//
//            <div className='row'>
//                <div className='form-group col-md-6'>
//                    <label htmlFor='type' className='label' style={inputLabelStyle}>Type</label>
//                    <input
//                        id='type'
//                        className='form-control' type='text'
//                        placeholder='Type'
//                        style={inputBoxStyle}
//                    />
//                </div>
//
//                <div className='form-group col-md-6'>
//                    <label htmlFor='price' className='label' style={inputLabelStyle}>Price</label>
//                    <div className='input-group'>
//                        <span className='input-group-text'
//                              style={{height: '45px', borderRadius: '10px 0 0 10px'}}>$</span>
//                        <input
//                            id='price' className='form-control' type='text'
//                            style={{
//                                borderRadius: '0 10px 10px 0',
//                                marginBottom: '10px',
//                                height: '45px',
//                            }}
//                        />
//                    </div>
//                </div>
//            </div>
//
//            <div className='row'>
//                <div className='form-group col-md-6'>
//                    <label htmlFor='quantity' className='label' style={inputLabelStyle}>Quantity</label>
//                    <input
//                        id='quantity'
//                        className='form-control' type='number'
//                        placeholder='Quantity'
//                        style={inputBoxStyle}
//                    />
//                </div>
//
//                <div className='form-group col-md-6'>
//                    <label htmlFor='date' className='label' style={inputLabelStyle}>Date</label>
//                    <input
//                        id='date' className='form-control' type='date'
//                        style={inputBoxStyle}
//                    />
//                </div>
//            </div>
//
//            <div className='form-group'>
//                <label htmlFor='platform_or_wallet' className='label' style={inputLabelStyle}>Platform or Wallet</label>
//                <input
//                    id='platform_or_wallet'
//                    className='form-control' type='email'
//                    style={inputBoxStyle}
//                />
//            </div>
//
//            <div className='form-group'>
//                <label htmlFor='password' className='label' style={inputLabelStyle}>Note</label>
//                <textarea className='form-control' rows='4' placeholder='write a note here...'/>
//            </div>
//
//            <div>
//                <button className='btn btn-primary btn-block w-100' style={buttonStyle}>
//                    Add Transaction
//                </button>
//            </div>