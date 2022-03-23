import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../Context/UserState'
import {watchlistURL} from '../backend'
import NumberFormat, {numberWithCommas} from '../Helpers/NumberFormat'
import Table, {TableRow} from '../Components/Table'
import Base from '../Components/Base'
import SearchBox from '../Components/SearchBox'
import {getCookie} from '../Helpers/Auth'
import DeleteFeed from '../Helpers/DeleteFeed'
import DeleteIcon from '@mui/icons-material/Delete'

const Watchlist = () => {
    const {authUser, authUser: {isAuth}} = useContext(UserContext)

    const [livePrice, setLivePrice] = useState([])

    const [pageNumber, setPageNumber] = useState(1)

    const handlePostWatchlist = (id) => {
        fetch(watchlistURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({crypto_id: id}),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24%2C7d`
                return fetch(api, {
                    method: 'GET',
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log('response sdfjds', response)
                setLivePrice([
                    ...livePrice,
                    ...response,
                ])
            })
            .catch(error => console.log(error))

    }

    const handleGetWatchlist = () => {
        fetch(watchlistURL, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                console.log(response.results[0].crypto_id)
                const arr = []
                for (let i = 0; i < response.results.length; i++)
                    arr.push(response.results[i].crypto_id)

                const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${arr.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24%2C7d`
                return fetch(api, {
                    method: 'GET',
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log('live price', response)
                setLivePrice([
                    ...response,
                ])
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleGetWatchlist()
    }, [pageNumber])

    const headings = () => {
        return (
            <>
                <th className='text-left'>Name</th>
                <th className='text-right'>Price</th>
                <th className='text-right'>Market Cap</th>
                <th className='text-right'>24h %</th>
                <th className='text-right'>7d %</th>
            </>
        )
    }


    return (
        <Base>
            <SearchBox onSubmit={handlePostWatchlist}/>
            <Table headings={headings} label='Watchlist'>
                {livePrice.map((livePrice, index) => {
                    return (
                        <TableRow key={index}>
                            <td>
                                <img className='inline' src={livePrice.image} alt='' width='30px'
                                     height='30px'/>
                                <span className='ml-2'>{livePrice.name}</span>
                            </td>
                            <td className='text-right'>${numberWithCommas(livePrice.current_price)}</td>
                            <td className='text-right'
                                title={numberWithCommas(`$ ${livePrice.market_cap}`)}>
                                ${NumberFormat(livePrice.market_cap)}
                            </td>

                            {(() => {
                                if (livePrice.price_change_percentage_24h > 0)
                                    return (
                                        <td
                                            className='text-right text-green-500 font-bold'>{livePrice.price_change_percentage_24h.toFixed(2)}%</td>)
                                else
                                    return <td
                                        className='text-right text-red-500 font-bold'>{livePrice.price_change_percentage_24h.toFixed(2)}%</td>
                            })()}


                            {(() => {
                                if (livePrice.price_change_percentage_7d_in_currency > 0)
                                    return (
                                        <td
                                            className='text-right text-green-500 font-bold'>{livePrice.price_change_percentage_7d_in_currency.toFixed(2)}%</td>)
                                else
                                    return <td
                                        className='text-right text-red-500 font-bold'>{livePrice.price_change_percentage_7d_in_currency.toFixed(2)}%</td>
                            })()}

                            <td className='text-right'>
                                <button
                                    //     onClick={() => DeleteFeed({
                                    //     'id': transaction.id,
                                    //     'state': transactions,
                                    //     'setState': setTransactions,
                                    // })}
                                >
                                    <DeleteIcon/>
                                </button>
                            </td>

                        </TableRow>
                    )
                })}
            </Table>
        </Base>
    )
}

export default Watchlist