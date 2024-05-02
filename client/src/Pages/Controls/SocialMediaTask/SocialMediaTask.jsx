import { Link } from 'react-router-dom';
import { useFetchAllSocialMediaCategory } from '../../../hooks/fetch.hooks';
import './SocialMediaTask.css'

function SocialMediaTask({setSelectedCard, setDisplay, toggleControlMenu, setPlatformcode}) {
  const { isLoadingSocialMediaCategory, SocialMediaCategoryData } = useFetchAllSocialMediaCategory();
  const socialMedia = SocialMediaCategoryData?.data
  //console.log(socialMedia)

  const handleMenu = (menu, platformCode) => {
    setDisplay(menu)
    toggleControlMenu()
    setPlatformcode(platformCode)
  }

  return (
    <div className='socialMediaTask'>
        <div className="top">
          <h2>All Social Media Account</h2>
          <div className="btn" onClick={() => setSelectedCard('newSocialMedia')} >
            <button>Add New</button>
          </div>
        </div>

        <div className="bodyItem">
          {
            socialMedia?.map((item) => (
              <div className="card">
                <p className="taskCode">{item?.taskCategoryCode}</p>
                <p className='code'>{item?.code}</p>
                <img src={item?.icon} alt='iocn' />
                <p className='platform'>{item?.platform}</p>
                <div onClick={() => handleMenu('TaskforSocialMedia', item?.code)} className="link btn">
                  View
                </div>
                <div className="btn">
                  Edit
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default SocialMediaTask