import Base from '../Components/Base'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../Context/UserState'
import {watchlistURL} from '../backend'

import NoteIcon from '@mui/icons-material/Note'
import Tooltip from '@mui/material/Tooltip'
import NumberFormat, {numberWithCommas} from '../Helpers/NumberFormat'
import Table, {TableRow} from '../Components/Table'

const Watchlist = () => {
    const {authUser, authUser: {isAuth}} = useContext(UserContext)

    const [watchlist, setWatchlist] = useState([])

    const [livePrice, setLivePrice] = useState([])

    const [pageNumber, setPageNumber] = useState(1)

    const handleGetWatchlist = () => {
        fetch(watchlistURL, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.results)
                setWatchlist([
                    ...watchlist,
                    ...response.results,
                ])
            })
            .then(handleGetLivePrice)
            .catch(error => console.log(error))
    }

    const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24%2C7d`

    const handleGetLivePrice = () => {
        fetch(api, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                console.log('live price', response)
                setLivePrice([
                    ...livePrice,
                    ...response,
                ])
            })
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

                    </TableRow>
                )
            })}
        </Table>
    )
}

export default Watchlist