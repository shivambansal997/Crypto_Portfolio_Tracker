// import {useContext, useEffect, useState} from 'react'
// import {UserContext} from '../Context/UserState'
// import {logoutURL, transactionURL} from '../backend'
// import NoteIcon from '@mui/icons-material/Note'
// import Tooltip from '@mui/material/Tooltip'
// import BuyImage from '../Icons/Buy.png'
// import SellImage from '../Icons/Sell.png'
//
// const FeedTransaction = () => {
//     const {authUser, authUser: {isAuth}} = useContext(UserContext)
//
//     const [transactions, setTransactions] = useState([])
//
//     const [pageNumber, setPageNumber] = useState(1)
//
//     const handleGetTransactions = () => {
//         fetch(transactionURL, {
//             method: 'GET',
//             credentials: 'include',
//         })
//             .then(response => response.json())
//             .then(response => {
//                 setTransactions([
//                     ...transactions,
//                     ...response.results,
//                 ])
//             })
//             .catch(error => console.log(error))
//     }
//
//     useEffect(() => {
//         handleGetTransactions()
//     }, [pageNumber])

// return (
//     <div className=''>
//         {transactions.map((transaction, index) => {
//                 return (
//                     <div key={index} className='flex justify-between mx-16 my-2'>
//                         <span className='flex gap-2'>
//                             {(() => {
//                                 if (transaction.type === 'Buy')
//                                     return <img src={BuyImage} width='30' height='30'/>
//                                 else return <img src={SellImage} width='30' height='30'/>
//                             })()}
//                             <div>{transaction.type}</div>
//                         </span>
//                         <span>{transaction.crypto_name}</span>
//                         <span>{transaction.created_at}</span>
//                         <span>{transaction.quantity}</span>
//                         <span>${transaction.price_usd}</span>
//                         <span>{transaction.platform}</span>
//                         <span>
//                             <Tooltip title={transaction.description}>
//                              <NoteIcon/>
//                             </Tooltip>
//                         </span>
//                     </div>
//                 )
//             },
//         )
//         }
//     </div>
// )
// }

// export default FeedTransaction