import { useState } from 'react'
import './Accordion.css'
import { accordion } from '../../../data/accordion'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function Accordion() {
  const [ clicked, setClicked ] = useState(false)

  const toggle = idx => {
      if(clicked === idx){
          return setClicked(null)
      }

      setClicked(idx)
  }
  return (
    <div className='accordion'>
        <div className='accordionCard'>
          <h1>Frequently Asked Questions?</h1>

          <div className="faqCard">
          {
                        accordion.map((item, idx) => (
                            <div className="card">
                                <div className="title" onClick={() => toggle(idx)} key={idx}>
                                    <span>
                                        {
                                            clicked === idx ? <RemoveCircleOutlineIcon className='icon' /> : <AddCircleOutlineIcon className='icon' />
                                        }
                                    </span>
                                    <h2>{item.qns}</h2>
                                </div>
                                {
                                    clicked === idx ? (
                                        <div className="dropDown">
                                            <p>{item.ans}</p>
                                        </div>

                                    ) : null
                                }
                            </div>
                        ))
                    }
          </div>
        </div>
    </div>
  )
}

export default Accordion