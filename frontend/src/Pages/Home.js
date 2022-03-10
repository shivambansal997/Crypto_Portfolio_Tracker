import Base from '../Components/Base'
import {useContext} from 'react'
import {ModalContext} from '../Context/ModalState'
import AddTransaction from '../Components/AddTransaction'


export default function Home() {
    const {setModal, setModalContent} = useContext(ModalContext)
    const openTransactionModal = () => {
        setModal(true)
        setModalContent(<AddTransaction/>)
    }
    return (
        <Base>
            <h2>Home Page</h2>
            <button onClick={openTransactionModal}>Add Transaction</button>
        </Base>
    )
}