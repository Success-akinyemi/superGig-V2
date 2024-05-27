import './MobileApplicationPlatform.css'
import { useFetchAllMobileApplicationPlatform } from '../../hooks/fetch.hooks'


function MobileApplicationPlatform({setSelectedCard, setDisplay, toggleControlMenu, setPlatformcode}) {
    const { isLoadingData, mobileApplicationPlatformData } = useFetchAllMobileApplicationPlatform()  
    const mobileData = mobileApplicationPlatformData?.data
      const handleMenu = (menu, platformCode) => {
          setDisplay(menu)
          toggleControlMenu()
          setPlatformcode(platformCode)
        }

  return (
    <div className='mobileApplicationPlatform'>
                <div className="top">
          <h2>All Mobile Application task</h2>
          <div className="btn" onClick={() => setSelectedCard('newMobileApplicationPlatform')} >
            <button>Add New</button>
          </div>
        </div>

        <div className="bodyItem">
          {
            mobileData?.map((item) => (
              <div className="card">
                <p className="taskCode">{item?.taskCategoryCode}</p>
                <p className='code'>{item?.code}</p>
                <img src={item?.icon} alt='iocn' />
                <p className='platform'>{item?.platform}</p>
                <div onClick={() => handleMenu('TaskformobileApplication', item?.code)} className="link btn">
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

export default MobileApplicationPlatform