import {createContext, useMemo, useState} from 'react'

const ModalContext = createContext(null)

const ModalState = (props) => {
    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const value = useMemo(() => ({
        modal,
        setModal,
        modalContent,
        setModalContent,
    }), [modal, setModal, modalContent, setModalContent])

    return (
        <ModalContext.Provider value={value}>
            {props.children}
        </ModalContext.Provider>
    )
}

export {ModalState, ModalContext}