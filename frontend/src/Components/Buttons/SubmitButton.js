const SubmitButton = (props) => {
    return (
        <div className='mt-[24px] mb-[24px]'>
            <button className='w-full h-[48px] rounded-[10px] bg-[#007BFF] hover:bg-[#0F68C6] text-white'
                    onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    )
}
export default SubmitButton