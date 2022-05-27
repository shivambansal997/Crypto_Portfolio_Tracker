const InputBox = (props) => {
    return (
        <div className='mb-[16px]'>

            <div className='mb-[8px]'>
                <label htmlFor={props.id} className='text-[16px] font-bold ml-[8px]'>{props.label}</label>
            </div>

            <div>
                <input
                    id={props.id}
                    className='h-[48px] w-full border border-[#919191] focus:outline-none rounded-[10px] p-3'
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.id}
                    onChange={props.onChange}
                    value={props.value}
                    autoComplete='off'
                />
            </div>

        </div>
    )
}
export default InputBox