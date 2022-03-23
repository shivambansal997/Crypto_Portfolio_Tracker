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
        <div className='w-96'>
            <input className='h-[40px] border border-[#919191] focus:outline-none rounded-[10px] p-3'
                   onChange={handleSearch}
                   value={selectedValue.name || ''}
            />
            {toggle &&
                <div className=''>
                    <ul className='bg-white rounded-lg border border-gray-200 w-full text-gray-900 overflow-y-scroll h-[100px]'>
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
            }
            <button onClick={() => {
                console.log(selectedValue)
                props.onSubmit(selectedValue.id)
            }}>submit
            </button>

        </div>
    )
}

export default SearchBox