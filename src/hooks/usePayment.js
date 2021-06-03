import { httpClient } from "../services/api/axiosHelper"

export const usePayment = (courseId, userId) => {
    const [data, setData] = useState(null)
    // send  course id and userid to User Payment
    const fetchPaidCourse = () => {
        const result = await httpClient.get(`http://localhost:1337/user-payment`)
        setData(result)
    }

    useEffect(() => {
        fetchPaidCourse()
    }, [])

    return data;

}