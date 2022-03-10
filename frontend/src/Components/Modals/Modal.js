import CloseIcon from '@mui/icons-material/Close'
import {useCallback, useContext, useEffect, useRef} from 'react'
import {ModalBackgroundStyle} from '../../Style/Style'
import ReactDOM from 'react-dom'
import {ModalContext} from '../../Context/ModalState'


export const Modal = (prop) => {
    const {modal, setModal, modalContent, setModalContent} = useContext(ModalContext)

    const closeModel = () => {
        setModal(false)
        setModalContent(null)
    }

    const keypress = useCallback(
        e => {
            if (e.key === 'Escape' && modal) {
                setModal(false)
                setModalContent(null)
            }
        },
        [setModal, modal, setModalContent],
    )

    useEffect(
        () => {
            document.addEventListener('keydown', keypress)
            return () => document.removeEventListener('keydown', keypress)
        },
        [keypress],
    )
    return ReactDOM.createPortal(
        modal ?
            <div className='w-full h-full bg-gray-400 bg-opacity-50 z-10 fixed overflow-auto'
                 onClick={closeModel}>
                <div className=''>
                    <div className='grid grid-cols-3 h-screen lg:h-full lg:mt-20'>
                        <div
                            className='bg-white col-start-1 col-end-4 lg:col-start-2 lg:col-end-3 lg:rounded-[10px]'
                            onClick={e => e.stopPropagation()}>

                            <CloseIcon className='cursor-pointer float-right mr-[40px] mt-[24px]'
                                       onClick={closeModel}/>

                            <div className='m-[50px] grid'>
                                {modalContent}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            : null,
        document.getElementById('modal'),
    )
}
export default Modal

// Boostrap Modal


// <div style={ModalBackgroundStyle} onClick={closeModel}>
//                 <div className='row d-flex justify-content-center align-items-center h-100'>
//                     <div className='col-md-6 col-lg-4 bg-white shadow'
//                          style={{
//                              borderRadius: '10px',
//                              boxShadow: '0px 0px 10px #00000029',
//                              maxHeight: '80vh',
//                          }}
//                          onClick={e => e.stopPropagation()}>
//                         <CloseIcon style={{float: 'right', cursor: 'pointer', margin: '20px'}}
//                                    onClick={closeModel}
//                         />
//                         <div className='m-5'>
//                             {modalContent}
//                         </div>
//                     </div>
//                 </div>
//             </div>
