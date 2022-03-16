import Base from '../Components/Base'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../Context/UserState'
import {transactionURL} from '../backend'
import BuyImage from '../Icons/Buy.png'
import SellImage from '../Icons/Sell.png'
import NoteIcon from '@mui/icons-material/Note'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteFeed from '../Helpers/DeleteFeed'
import Table, {TableRow} from '../Components/Table'

const Transactions = () => {
    const {authUser, authUser: {isAuth}} = useContext(UserContext)

    const [transactions, setTransactions] = useState([])

    const [pageNumber, setPageNumber] = useState(1)


    const handleGetTransactions = () => {
        fetch(transactionURL, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                setTransactions([
                    ...transactions,
                    ...response.results,
                ])
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        handleGetTransactions()
    }, [pageNumber])

    const headings = () => {
        return (
            <>
                <th className='text-left'>Type</th>
                <th className='text-right'>Name</th>
                <th className='text-right'>Date</th>
                <th className='text-right'>Quantity</th>
                <th className='text-right'>Price</th>
                <th className='text-right'>Platform</th>
                <th className='text-right'>Note</th>
            </>
        )
    }

    return (
        <Table headings={headings} label='Transactions'>
            {transactions.map((transaction, index) => {
                    return (
                        <TableRow key={index}>
                            <td>
                                {(() => {
                                    if (transaction.type === 'Buy')
                                        return <img className='inline' src={BuyImage} width='30' height='30'/>
                                    else return <img className='inline' src={SellImage} width='30' height='30'/>
                                })()}
                                <span className='ml-2'>{transaction.type}</span>
                            </td>
                            <td className='text-right'>{transaction.crypto_name}</td>
                            <td className='text-right'>{transaction.created_at}</td>
                            <td className='text-right'>{transaction.quantity}</td>
                            <td className='text-right'>${transaction.price_usd}</td>
                            <td className='text-right'>{transaction.platform}</td>
                            <td className='text-right'>
                                <Tooltip title={transaction.description}>
                                    <NoteIcon/>
                                </Tooltip>
                            </td>
                            <td className='text-right'>
                                <button onClick={() => DeleteFeed({
                                    'id': transaction.id,
                                    'state': transactions,
                                    'setState': setTransactions,
                                })}>
                                    <DeleteIcon/>
                                </button>
                            </td>
                        </TableRow>

                    )
                },
            )
            }
        </Table>

    )
}

export default Transactions