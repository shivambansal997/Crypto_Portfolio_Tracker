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
import {ModalContext} from '../Context/ModalState'
import AddTransaction from '../Components/AddTransaction'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const Transactions = () => {
    const {authUser, authUser: {isAuth}} = useContext(UserContext)

    const [transactions, setTransactions] = useState([])

    const [pageNumber, setPageNumber] = useState(1)

    const {setModal, setModalContent} = useContext(ModalContext)

    const openTransactionModal = () => {
        setModal(true)
        setModalContent(<AddTransaction/>)
    }

    const handleGetTransactions = () => {
        fetch(transactionURL, {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(response => {
                setTransactions([
                    ...response.results,
                ])
                console.log(transactions)
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

    const TableButton = () => {
        return (
            <button
                className='w-[150px] h-[35px] rounded-[10px] bg-[#007BFF] hover:bg-[#0F68C6] text-white px-4'
                onClick={openTransactionModal}>
                <AddCircleIcon className='align-bottom' fontSize='small'/>
                <span>Transaction</span>
            </button>
        )
    }


    return (
        <Table headings={headings} label='Transactions' button={TableButton}>
            {transactions.map((transaction, index) => {
                    return (
                        <TableRow key={index}>
                            <td>
                                {(() => {
                                    if (transaction.type.toLowerCase() === 'buy')
                                        return <img className='inline' src={BuyImage} width='30' height='30'/>
                                    else return <img className='inline' src={SellImage} width='30' height='30'/>
                                })()}
                                <span className='ml-2'>{transaction.type}</span>
                            </td>
                            <td className='text-right'>{transaction.crypto_name}</td>
                            <td className='text-right'> {transaction.date}</td>
                            <td className='text-right'
                                title={transaction.quantity}> {parseFloat(transaction.quantity).toFixed(3)}</td>
                            <td className='text-right'
                                title={transaction.price_usd}>${parseFloat(transaction.price_usd).toFixed(3)}</td>
                            <td className='text-right'>{transaction.platform}</td>
                            <td className='text-right'>
                                <Tooltip title={transaction.description}>
                                    <NoteIcon/>
                                </Tooltip>
                            </td>
                            <td className='text-right'>
                                <button onClick={() => DeleteFeed({
                                    'id': transaction.id,
                                    'url': transactionURL,
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