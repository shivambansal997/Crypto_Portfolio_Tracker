import {useContext, useEffect, useState} from 'react'
import {ModalContext} from '../Context/ModalState'
import AddTransaction from '../Components/AddTransaction'
import Table, {TableRow} from '../Components/Table'
import {holdingURL} from '../backend'
import NumberFormat, {numberWithCommas} from '../Helpers/NumberFormat'
import Base from '../Components/Base'


export default function Home() {
    const {setModal, setModalContent} = useContext(ModalContext)

    const [pageNumber, setPageNumber] = useState(1)

    const [livePrice, setLivePrice] = useState([])

    const [holdings, setHoldings] = useState({})


    const openTransactionModal = () => {
        setModal(true)
        setModalContent(<AddTransaction/>)
    }

    const handleGetHoldings = () => {
        fetch(holdingURL, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                console.log('holdings', response)
                console.log(response.results[0].crypto)
                const obj = {}
                const arr = []
                for (let i = 0; i < response.results.length; i++) {
                    arr.push(response.results[i].crypto)
                    obj[response.results[i].crypto] = response.results[i]
                }
                console.log('obj', obj)
                setHoldings(obj)
                const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${arr.toString()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24%2C7d`
                return fetch(api, {
                    method: 'GET',
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log('live price', response)
                setLivePrice([
                    ...livePrice,
                    ...response,
                ])
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleGetHoldings()
    }, [pageNumber])


    const headings = () => {
        return (
            <>
                <th className='text-left'>Name</th>
                <th className='text-right'>Price</th>
                <th className='text-right'>Market Cap</th>
                <th className='text-right'>Holding</th>
                <th className='text-right'>Avg. Buy Price</th>
                <th className='text-right'>P&L</th>
            </>
        )
    }


    return (
        <Base>
            <div className='mt-6 mx-24'>My Portfolio</div>
            <Table headings={headings} label='My Portfolio'>
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
                            <td className='text-right'>
                                {holdings[livePrice.id].quantity}
                            </td>
                            <td className='text-right'>
                                {holdings[livePrice.id].avg_price}
                            </td>
                            <td className='text-right'>
                                {`$${(livePrice.current_price - holdings[livePrice.id].avg_price) * holdings[livePrice.id].quantity}`}
                            </td>
                        </TableRow>
                    )
                })}
            </Table>
        </Base>
    )
}