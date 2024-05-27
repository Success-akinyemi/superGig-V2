import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

async function getUser() {
    // You can return a mock user object with an 'id' property
    return { id: 'mockUserId' };
}

axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST_SERVER_API
//axios.defaults.baseURL = import.meta.env.VITE_LIVE_SERVER_API

const token = localStorage.getItem('authToken')

/**Get User Details Hooks */
export function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})


    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : '';


                const { data, status} = !query ? await axios.get(`/api/admin/getAllUser`, {withCredentials: true}) : await axios.get(`/api/admin/getAllUser`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setData({ isLoading: false, apiData: data, status: status, serverError: null})
                } else{
                    setData({ isLoading: false, apiData: null, status: status, serverError: null})
                }
            } catch (error) {
                setData({ isLoading: false, apiData: null, status: null, serverError: error})
            }
        };
        fetchData()
    }, [query])

    return data
}

/**Get User Account Details Hooks */
export function useFetchAccount(query){
    const [accountData, setAccountData] = useState({ isLoadingAccount: true, apiAccountData: null, accountStatus: null, accountServerError: null})
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const id = user._id

    useEffect(() => {
        const fetchAccountData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getUserAccountInfo/${id}`, {withCredentials: true}) : await axios.get(`/api/getUserAccountInfo/${id}`, {withCredentials: true})
                //console.log('Data from Hook BANKs>>>', data)

                if(status === 200){
                    setAccountData({ isLoadingAccount: false, apiAccountData: data, accountStatus: status, accountServerError: null})
                } else{
                    setAccountData({ isLoadingAccount: false, apiAccountData: null, accountStatus: status, accountServerError: null})
                }
            } catch (error) {
                setAccountData({ isLoadingAccount: false, apiAccountData: null, accountStatus: null, accountServerError: error})
                console.log('TAP',error)
            }
        };
        fetchAccountData()
    }, [query])

    return accountData
}

/**Get User Payment order (withdrwal request) */
export function useFetchPaymentOrder(query){
    const [paymentData, setPaymentData] = useState({ isLoadingPayment: true, paymentData: null, paymentStatus: null, paymentServerError: null})
    
    useEffect(() => {
        const fetchPaymentData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getPaymentOrder/${query}`, {withCredentials: true}) : await axios.get(`/api/getPaymentOrder/${query}`, {withCredentials: true})
                //console.log('Payment Data from Hooks>>>', data)

                if(status === 200){
                    setPaymentData({ isLoadingPayment: false, paymentData: data, paymentStatus: status, paymentServerError: null})
                } else{
                    setPaymentData({ isLoadingPayment: false, paymentData: null, paymentStatus: status, paymentServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA', error)
                setPaymentData({ isLoadingPayment: false, paymentData: null, paymentStatus: null, paymentServerError: error})
            }
        };
        fetchPaymentData()
    }, [query])

    return paymentData
}

/**Get User Transactions */
export function useFetchTransaction(query){
    const [transactionData, setTransactionData] = useState({ isLoadingTransaction: true, transactionData: null, transactionStatus: null, transactionServerError: null})
    
    useEffect(() => {
        const fetchTransactionData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getTransactionData/${query}`, {withCredentials: true}) : await axios.get(`/api/getTransactionData/${query}`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setTransactionData({ isLoadingTransaction: false, transactionData: data, transactionStatus: status, transactionServerError: null})
                } else{
                    setTransactionData({ isLoadingTransaction: false, transactionData: null, transactionStatus: status, transactionServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setTransactionData({ isLoadingTransaction: false, transactionData: null, transactionStatus: null, transactionServerError: error})
            }
        };
        fetchTransactionData()
    }, [query])

    return transactionData
}

/**Get all user Referres */
export function useFetchReferres(query){
    const [referresData, setReferresData] = useState({ isLoadingReferres: true, apiReferresData: null, referresStatus: null, referresServerError: null})


    useEffect(() => {
        const fetchData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllUserReferrees/${query}`, {withCredentials: true}) : await axios.get(`/api/getAllUserReferrees/${query}`, {withCredentials: true})
                //console.log('Referral Data from Hooks>>>', data)

                if(status === 200){
                    setReferresData({ isLoadingReferres: false, apiReferresData: data, referresStatus: status, referresServerError: null})
                } else{
                    setReferresData({ isLoadingReferres: false, apiReferresData: null, referresStatus: status, referresServerError: null})
                }
            } catch (error) {
                setReferresData({ isLoadingReferres: false, apiReferresData: null, referresStatus: null, referresServerError: error})
            }
        };
        fetchData()
    }, [query])

    return referresData
}

/**Get All Task From DB To Freelancer*/
export function useFetchTask(query){
    const [taskData, setTaskData] = useState({ isLoadingTask: true, apiTaskData: null, taskStatus: null, taskServerError: null})
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const id = user._id

    useEffect(() => {
        const fetchData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllTask/${id}`, {withCredentials: true}) : await axios.get(`/api/getTask/${id}/${query}`, {withCredentials: true})
                //console.log('Task Data from Hooks>>>', data)

                if(status === 200){
                    setTaskData({ isLoadingTask: false, apiTaskData: data, taskStatus: status, taskServerError: null})
                } else{
                    setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: status, taskServerError: null})
                }
            } catch (error) {
                setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: null, taskServerError: error})
            }
        };
        fetchData()
    }, [query])

    return taskData
}

/**Get All Task From DB To Freelancer*/
export function useFetchTaskCompletedByUser(query){
    const [taskData, setTaskData] = useState({ isLoadingTask: true, apiTaskData: null, taskStatus: null, taskServerError: null})
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const id = user._id

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { data, status} = !query ? await axios.get(`/api/getAllTaskCompletedByUser/${id}`, {withCredentials: true}) : await axios.get(`/api/getAllTaskCompletedByUser/${id}/${query}`, {withCredentials: true})
                //console.log('Task Data from Hooks>>>', data)

                if(status === 200){
                    setTaskData({ isLoadingTask: false, apiTaskData: data, taskStatus: status, taskServerError: null})
                } else{
                    setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: status, taskServerError: null})
                }
            } catch (error) {
                setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: null, taskServerError: error})
            }
        };
        fetchData()
    }, [query])

    return taskData
}

/**Get All task posted by user */
export function useFetchTaskPostedByUser(query){
    const [taskData, setTaskData] = useState({ isLoadingTask: true, apiTaskData: null, taskStatus: null, taskServerError: null})
    const {currentUser} = useSelector(state => state.user)
    const user = currentUser?.data
    const id = user._id

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { data, status} = !query ? await axios.get(`/api/getAllTaskPostedByUser/${id}`, {withCredentials: true}) : await axios.get(`/api/getATaskPostedByUser/${id}/${query}`, {withCredentials: true})
                //console.log('POSTED Task Data from Hooks>>>', data)

                if(status === 200){
                    setTaskData({ isLoadingTask: false, apiTaskData: data, taskStatus: status, taskServerError: null})
                } else{
                    setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: status, taskServerError: null})
                }
            } catch (error) {
                setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: null, taskServerError: error})
            }
        };
        fetchData()
    }, [query])

    return taskData
}

/**Get all payment order */
export function useFetchAllPaymentOrder(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : '';
                
                const { data, status} = !query ? await axios.get(`/api/admin/getAllPaymentOrder/${query}`, {withCredentials: true}) : await axios.get(`/api/admin/getAllPaymentOrder/${query}`, {withCredentials: true})
                //console.log('ALL PAYMENT DATA from Hooks>>>', data)

                if(status === 200){
                    setData({ isLoading: false, apiData: data, status: status, serverError: null})
                } else{
                    setData({ isLoading: false, apiData: null, status: status, serverError: null})
                }
            } catch (error) {
                console.log('ERR', error)
                setData({ isLoading: false, apiData: null, status: null, serverError: error})
            }
        };
        fetchData()
    }, [query])

    return data
}

/**Get a payment order */
export function useFetchAPaymentOrder(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : '';
                
                const { data, status} = !query ? await axios.get(`/api/admin/getAPaymentOrder/${query}`, {headers: {Authorization: `Bearer ${token}`}}) : await axios.get(`/api/admin/getAPaymentOrder/${query}`, {headers: {Authorization: `Bearer ${token}`}})
                //console.log('ALL PAYMENT DATA from Hooks>>>', data)

                if(status === 200){
                    setData({ isLoading: false, apiData: data, status: status, serverError: null})
                } else{
                    setData({ isLoading: false, apiData: null, status: status, serverError: null})
                }
            } catch (error) {
                console.log('ERR', error)
                setData({ isLoading: false, apiData: null, status: null, serverError: error})
            }
        };
        fetchData()
    }, [query])

    return data
}

/**Get All Task From DB To Ad*/
export function useFetchTaskAdmin(query){
    const [taskData, setTaskData] = useState({ isLoadingTask: true, apiTaskData: null, taskStatus: null, taskServerError: null})


    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : await getUser();

                const { data, status} = !query ? await axios.get(`/api/admin/getAllTask/${id}`, {headers: {Authorization: `Bearer ${token}`}}) : await axios.get(`/api/admin/getTask/${id}/${query}`, {headers: {Authorization: `Bearer ${token}`}})
                //console.log('Task Data from Hooks>>>', data)

                if(status === 200){
                    setTaskData({ isLoadingTask: false, apiTaskData: data, taskStatus: status, taskServerError: null})
                } else{
                    setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: status, taskServerError: null})
                }
            } catch (error) {
                setTaskData({ isLoadingTask: false, apiTaskData: null, taskStatus: null, taskServerError: error})
            }
        };
        fetchData()
    }, [query])

    return taskData
}

/**Get All Task Category Data */
export function useFetchAllTaskCategory(query){
    const [taskCategoryData, setTaskCategoryData] = useState({ isLoadingTaskCategoryData: true, taskCategoryData: null, taskCategoryStatus: null, taskCategoryServerError: null})
    
    useEffect(() => {
        const fetchTaskCategoryData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllTaskCategory`, {withCredentials: true}) : await axios.get(`/api/getAllTaskCategory`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setTaskCategoryData({ isLoadingTaskCategoryData: false, taskCategoryData: data, taskCategoryStatus: status, taskCategoryServerError: null})
                } else{
                    setTaskCategoryData({ isLoadingTaskCategoryData: false, taskCategoryData: null, taskCategoryStatus: status, taskCategoryServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setTaskCategoryData({ isLoadingTaskCategoryData: false, taskCategoryData: null, taskCategoryStatus: null, taskCategoryServerError: error})
            }
        };
        fetchTaskCategoryData()
    }, [query])

    return taskCategoryData
}

/**Get All Social Media Category Data */
export function useFetchAllSocialMediaCategory(query){
    const [socialMediaCategory, setSocialMediaCategory] = useState({ isLoadingSocialMediaCategory: true, SocialMediaCategoryData: null, SocialMediaCategoryStatus: null, SocialMediaCategoryServerError: null})
    
    useEffect(() => {
        const fetchSocialMediaCategory =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllSocialMediaCategory`, {withCredentials: true}) : await axios.get(`/api/getAllSocialMediaCategory`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setSocialMediaCategory({ isLoadingSocialMediaCategory: false, SocialMediaCategoryData: data, SocialMediaCategoryStatus: status, SocialMediaCategoryServerError: null})
                } else{
                    setSocialMediaCategory({ isLoadingSocialMediaCategory: false, SocialMediaCategoryData: null, SocialMediaCategoryStatus: status, SocialMediaCategoryServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA socail media category', error)
                setSocialMediaCategory({ isLoadingSocialMediaCategory: false, SocialMediaCategoryData: null, SocialMediaCategoryStatus: null, SocialMediaCategoryServerError: error})
            }
        };
        fetchSocialMediaCategory()
    }, [query])

    return socialMediaCategory
}

/**Get All Music Platform Data */
export function useFetchAllMusicPlatform(query){
    const [musicPlatform, setMusicPlatform] = useState({ isLoadingMusicPlatform: true, musicPlatformData: null, musicPlatformStatus: null, musicPlatformServerError: null})
    
    useEffect(() => {
        const fetchMusicPlatform =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllMusicPlatform`, {withCredentials: true}) : await axios.get(`/api/getAllMusicPlatform`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMusicPlatform({ isLoadingMusicPlatform: false, musicPlatformData: data, musicPlatformStatus: status, musicPlatformServerError: null})
                } else{
                    setMusicPlatform({ isLoadingMusicPlatform: false, musicPlatformData: null, musicPlatformStatus: status, musicPlatformServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA socail media category', error)
                setMusicPlatform({ isLoadingMusicPlatform: false, musicPlatformData: null, musicPlatformStatus: null, musicPlatformServerError: error})
            }
        };
        fetchMusicPlatform()
    }, [query])

    return musicPlatform
}

/**Get All Social media Task Data */
export function useFetchSocialMediaTask(query){
    const [socialMediaTaskData, setSocialMediaTaskData] = useState({ isLoadingSocialMediaTaskData: true, socialMediaTaskData: null, socialMediaTaskStatus: null, socialMediaTaskServerError: null})
    
    useEffect(() => {
        const fetchSocialMediaTaskData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllSocialMediaTask`, {withCredentials: true}) : await axios.get(`/api/getAllSocialMediaTask`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: data, socialMediaTaskStatus: status, socialMediaTaskServerError: null})
                } else{
                    setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: null, socialMediaTaskStatus: status, socialMediaTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: null, socialMediaTaskStatus: null, socialMediaTaskServerError: error})
            }
        };
        fetchSocialMediaTaskData()
    }, [query])

    return socialMediaTaskData
}

/**Get All Music Task Data */
export function useFetchMusicTask(query){
    const [musicTaskData, setMusicTaskData] = useState({ isLoadingMusicTaskData: true, musicTaskData: null, musicTaskStatus: null, musicTaskServerError: null})
    
    useEffect(() => {
        const fetchMusicTaskData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllMusicTask`, {withCredentials: true}) : await axios.get(`/api/getAllMusicTask`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: data, musicTaskStatus: status, musicTaskServerError: null})
                } else{
                    setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: null, musicTaskStatus: status, musicTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: null, musicTaskStatus: null, musicTaskServerError: error})
            }
        };
        fetchMusicTaskData()
    }, [query])

    return musicTaskData
}

/**Get All Task for a Social media platform */
export function useFetchGetAllSocialMediaTask(query){
    const [socialMediaTaskData, setSocialMediaTaskData] = useState({ isLoadingSocialMediaTaskData: true, socialMediaTaskData: null, socialMediaTaskStatus: null, socialMediaTaskServerError: null})
    
    useEffect(() => {
        const fetchSocialMediaTaskData =  async () => {
            try {
                const { code, id} = query
                const { data, status} = !query ? await axios.get(`/api/admin/getAllTaskForSocialMedia/:${code}`, {withCredentials: true}) : await axios.get(`/api/admin/getAllTaskForSocialMedia/:${code}/:${id}`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: data, socialMediaTaskStatus: status, socialMediaTaskServerError: null})
                } else{
                    setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: null, socialMediaTaskStatus: status, socialMediaTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setSocialMediaTaskData({ isLoadingSocialMediaTaskData: false, socialMediaTaskData: null, socialMediaTaskStatus: null, socialMediaTaskServerError: error})
            }
        };
        fetchSocialMediaTaskData()
    }, [query])

    return socialMediaTaskData
}

/**Get All Task for a music Platform */
export function useFetchGetAllMusicTask(query){
    const [musicTaskData, setMusicTaskData] = useState({ isLoadingMusicTaskData: true, musicTaskData: null, musicTaskStatus: null, musicTaskServerError: null})
    
    useEffect(() => {
        const fetchMusicTaskData =  async () => {
            try {
                const { code, id} = query
                const { data, status} = !query ? await axios.get(`/api/admin/getAllTaskForMusic/:${code}`, {withCredentials: true}) : await axios.get(`/api/admin/getAllTaskForMusic/:${code}/:${id}`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: data, musicTaskStatus: status, musicTaskServerError: null})
                } else{
                    setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: null, musicTaskStatus: status, musicTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setMusicTaskData({ isLoadingMusicTaskData: false, musicTaskData: null, musicTaskStatus: null, musicTaskServerError: error})
            }
        };
        fetchMusicTaskData()
    }, [query])

    return musicTaskData
}

/**MOBILE APPLICATION */
/**Get All Mobile appliaction Platform Data */
export function useFetchAllMobileApplicationPlatform(query){
    const [mobileApplicationPlatfrom, setMobileApplicationPlatfrom] = useState({ isLoadingData: true, mobileApplicationPlatformData: null, mobileApplicationPlatfromStatus: null, mobileApplicationServerError: null})
    
    useEffect(() => {
        const fetchMobileApplicationPlatfrom =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllMobileApplicationPlatform`, {withCredentials: true}) : await axios.get(`/api/getAllMobileApplicationPlatform`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMobileApplicationPlatfrom({ isLoadingData: false, mobileApplicationPlatformData: data, mobileApplicationPlatfromStatus: status, mobileApplicationServerError: null})
                } else{
                    setMobileApplicationPlatfrom({ isLoadingData: false, mobileApplicationPlatformData: null, mobileApplicationPlatfromStatus: status, mobileApplicationServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA socail media category', error)
                setMobileApplicationPlatfrom({ isLoadingData: false, mobileApplicationPlatformData: null, mobileApplicationPlatfromStatus: null, mobileApplicationServerError: error})
            }
        };
        fetchMobileApplicationPlatfrom()
    }, [query])

    return mobileApplicationPlatfrom
}

/**Get All Task for a music Platform */
export function useFetchGetAllMobileApplicationTask(query){
    const [mobileApplicationTaskData, setMobileApplicationTaskData] = useState({ isLoadingMobileApplicationTaskData: true, mobileApplicationTaskData: null, mobileApplicationTaskStatus: null, mobileApplicationTaskServerError: null})
    
    useEffect(() => {
        const fetchMobileApplicationTaskData =  async () => {
            try {
                const { code, id} = query
                const { data, status} = !query ? await axios.get(`/api/admin/getAllTaskForAMobileApplication/:${code}`, {withCredentials: true}) : await axios.get(`/api/admin/getAllTaskForAMobileApplication/:${code}/:${id}`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMobileApplicationTaskData({ isLoadingMobileApplicationTaskData: false, mobileApplicationTaskData: data, mobileApplicationTaskStatus: status, mobileApplicationTaskServerError: null})
                } else{
                    setMobileApplicationTaskData({ isLoadingMobileApplicationTaskData: false, mobileApplicationTaskData: null, mobileApplicationTaskStatus: status, mobileApplicationTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setMobileApplicationTaskData({ isLoadingMobileApplicationTaskData: false, mobileApplicationTaskData: null, mobileApplicationTaskStatus: null, mobileApplicationTaskServerError: error})
            }
        };
        fetchMobileApplicationTaskData()
    }, [query])

    return mobileApplicationTaskData
}

/**Get All Music Task Data */
export function useFetchMobileApplicationTask(query){
    const [mobileApplicationTaskData, setMobileApplicationTaskData] = useState({ isLoadingMobileTaskData: true, mobileApplicationTaskData: null, mobileApplicationTaskStatus: null, mobileApplicationTaskServerError: null})
    
    useEffect(() => {
        const fetchMobileApplicationTaskData =  async () => {
            try {

                const { data, status} = !query ? await axios.get(`/api/getAllMobileApplicationTask`, {withCredentials: true}) : await axios.get(`/api/getAllMobileApplicationTask`,  {withCredentials: true})
                //console.log('Transaction Data from Hooks>>>', data)

                if(status === 200){
                    setMobileApplicationTaskData({ isLoadingMobileTaskData: false, mobileApplicationTaskData: data, mobileApplicationTaskStatus: status, mobileApplicationTaskServerError: null})
                } else{
                    setMobileApplicationTaskData({ isLoadingMobileTaskData: false, mobileApplicationTaskData: null, mobileApplicationTaskStatus: status, mobileApplicationTaskServerError: null})
                }
            } catch (error) {
                console.log('COULF NOT FETCH DATA Transactions', error)
                setMobileApplicationTaskData({ isLoadingMobileTaskData: false, mobileApplicationTaskData: null, mobileApplicationTaskStatus: null, mobileApplicationTaskServerError: error})
            }
        };
        fetchMobileApplicationTaskData()
    }, [query])

    return mobileApplicationTaskData
}