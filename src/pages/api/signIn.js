import axiosInstance from "../../network/api";

// export default async function handler(req, res) {
//     try {
//         // Make an API request here and retrieve the data

//         const param1 = 'value1';
//         const param2 = 'value2';

//         axiosInstance.post("/api/fetchData?param1=${param1}&param2=${param2}")
//             .then((response) => console.warn(response))
//             .catch((error) => console.error(error));


//         // res.status(200).json({ data });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// }



import { onLogin } from "../../network/actions/login";
import { useDispatch } from "react-redux";

export default async function handler(req, res) {
    try {

        // const data = useDispatch(onLogin()); // Call your Axios API function

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}


