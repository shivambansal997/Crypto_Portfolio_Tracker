import {useState} from 'react'

const SearchBox = (props) => {

    const [coins, setCoins] = useState([])
    const [toggle, setToggle] = useState(false)
    const [selectedValue, setSelectedValue] = useState({})

    let controller
    const handleSearch = e => {
        setSelectedValue({
            name: e.target.value,
        })
        const query = e.target.value
        if (query) {
            setToggle(true)
            if (controller) controller.abort()
            controller = new AbortController()
            const {signal} = controller


            const search = `https://api.coingecko.com/api/v3/search?query=${query}`
            fetch(search, {
                method: 'GET',
                signal,
            })
                .then(response => response.json())
                .then(response => {
                    console.log('search', response.coins)
                    setCoins([
                        ...response.coins,
                    ])
                })
                .catch(error => console.log(error))
        } else setToggle(false)

    }

    return (
        <div className='flex'>
            <div className='w-full mb-[16px]'>

                {props.label &&
                    <div className='mb-[8px]'>
                        <label htmlFor={props.id} className='text-[16px] font-bold ml-[8px]'>{props.label}</label>
                    </div>
                }

                <input className='h-[48px] border border-[#919191] focus:outline-none rounded-[10px] p-3 w-full'
                       placeholder={props.placeholder}
                       onChange={handleSearch}
                       value={selectedValue.name || ''}
                       data-crypto-id={selectedValue.id || ''}
                       id='search_box'
                       autoComplete='off'
                />
                {toggle &&
                    <div className='relative'>
                        <div className='absolute w-full'>
                            <ul className='bg-white rounded-lg border border-gray-200 w-full text-gray-900 overflow-y-scroll h-[150px]'>
                                {coins.map((coin, index) => {
                                    return (
                                        <li key={index}
                                            className='px-6 py-2 border-b border-gray-200 w-full cursor-pointer hover:bg-gray-100'
                                            onClick={() => {
                                                setSelectedValue(coin)
                                                setToggle(false)
                                            }}
                                        >
                                            <img className='inline' src={coin.thumb} alt=''/>
                                            <span className='ml-2'>{coin.name}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                }
            </div>

            {props.onSubmit &&
                <button
                    className='w-[150px] h-[48px] rounded-[10px] bg-[#007BFF] hover:bg-[#0F68C6] text-white px-4'
                    onClick={() => {
                        console.log(selectedValue)
                        props.onSubmit(selectedValue.id)
                    }}>submit
                </button>
            }
        </div>
    )
}

export default SearchBox