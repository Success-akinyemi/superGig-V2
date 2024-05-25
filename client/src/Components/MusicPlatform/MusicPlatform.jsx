import { useFetchAllMusicPlatform } from '../../hooks/fetch.hooks'
import './MusicPlatform.css'

function MusicPlatform({setSelectedCard, setDisplay, toggleControlMenu, setPlatformcode}) {
  const { isLoadingMusicPlatform, musicPlatformData } = useFetchAllMusicPlatform()  
  const musicData = musicPlatformData?.data
    const handleMenu = (menu, platformCode) => {
        setDisplay(menu)
        toggleControlMenu()
        setPlatformcode(platformCode)
      }

  return (
    <div className='musicPlatform'>
        <div className="top">
          <h2>All Music task</h2>
          <div className="btn" onClick={() => setSelectedCard('newMusicPlatform')} >
            <button>Add New</button>
          </div>
        </div>

        <div className="bodyItem">
          {
            musicData?.map((item) => (
              <div className="card">
                <p className="taskCode">{item?.taskCategoryCode}</p>
                <p className='code'>{item?.code}</p>
                <img src={item?.icon} alt='iocn' />
                <p className='platform'>{item?.platform}</p>
                <div onClick={() => handleMenu('Taskformusic', item?.code)} className="link btn">
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

export default MusicPlatform