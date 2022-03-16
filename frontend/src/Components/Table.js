import Base from './Base'

const Table = (props) => {
    return (
        <Base>
            <div className=' mt-6'>
                <div className='mx-24'>
                    <div className='text-2xl font-bold'>{props.label}</div>
                </div>

                <div className='flex flex-col bg-white mx-16 shadow-md rounded-lg mt-2 overflow-auto'>
                    <table className='table-auto divide-y mx-10 '>
                        <thead>
                        <tr className='h-12'>
                            {props.headings()}
                        </tr>
                        </thead>
                        <tbody>
                        {props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        </Base>
    )
}

export const TableRow = (props) => {
    return (
        <tr className='h-12 justify-center hover:bg-gray-100'>
            {props.children}
        </tr>
    )
}

export default Table