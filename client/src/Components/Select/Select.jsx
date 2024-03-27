import './Select.css'

function Select({data, onChange, id, value, text, heading}) {
  return (
    <select id={id} onChange={onChange} className='select'>
        <option value="">--{heading} --</option>
        {
            data?.map((item) => (
                <option key={item?._id} value={item[value]}>{item[text]}</option>
            ))
        }
    </select>
  )
}

export default Select