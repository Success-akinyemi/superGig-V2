import { useEffect, useState } from 'react';
import './CreateTask.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import { useFetchAllSocialMediaCategory, useFetchAllTaskCategory } from '../../hooks/fetch.hooks';
import Select from '../../Components/Select/Select';

function CreateTask() {
  const {currentUser} = useSelector(state => state.user)
  const user = currentUser?.data
  console.log('ID', user._id)
  const [ content, setContet ] = useState(1)
  const [ formData, setFormData ] = useState({ createdBy: user?._id })
  const { isLoadingTaskCategoryData, taskCategoryData } = useFetchAllTaskCategory();
  const catData = taskCategoryData?.data 
  const { isLoadingSocialMediaCategory, SocialMediaCategoryData } = useFetchAllSocialMediaCategory();
  const socialMediaData = SocialMediaCategoryData?.data
  

  const [selectedTaskCategory, setSelectedTaskCategory] = useState('');
  
  const [selectedPlatform, setSelectedPlaform] = useState('')
  const [selectedSocialMediaData, setSelectedSocialMediaData] = useState([]);

  useEffect(() => {
    if(selectedPlatform){
        const trimmedSelectedTaskCategory = selectedPlatform;
        //console.log('selectedCategory', trimmedSelectedTaskCategory)
        const filterSocialMediaData = socialMediaData?.filter(socialMediaData => socialMediaData?.taskCategoryCode === trimmedSelectedTaskCategory)
        setSelectedSocialMediaData(filterSocialMediaData)
        console.log(selectedSocialMediaData)
    } else {
        setSelectedSocialMediaData([])
    }
  }, [selectedTaskCategory, socialMediaData])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value})
    if(id === 'categoryCode'){
      setSelectedTaskCategory(value)
    }

    if(id === 'platformCode'){
      setSelectedPlaform(value)
    }
  }

  return (
    <div className='createTask'>
      <div className="back">
          <ArrowBackIcon className='backIcon' />
      </div>
      <div className="title">
        Supergig
      </div>

      <div className="content">
        <h2 className='head'>Create Task</h2>

        <div className="body">
          {
            content === 1 && (
              <div className="contentCard">
                <div className="card">
                  <label>Select Category</label>
                  <Select 
                    data={catData}
                    onChange={handleChange}
                    id={`categoryCode`}
                    value={`code`}
                    text={`category`}
                    heading= {`Select Category`}
                  />
                </div>

                {
                  selectedTaskCategory === '1' && (
                    <div className="card">
                      <label>Select Platform</label>
                      <Select 
                        data={socialMediaData}
                        onChange={handleChange}
                        id={`platformCode`}
                        value={`code`}
                        text={`platform`}
                        heading= {`Select Platform`}
                      />
                    </div>
                  )
                }
              </div>
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default CreateTask