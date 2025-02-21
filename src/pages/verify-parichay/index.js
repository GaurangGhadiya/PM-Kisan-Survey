// import { checkUser } from '@/network/actions/checkUser';
// import { ApiGetNoAuth, ApiPostNoAuth } from '@/network/apiData';
// import { setCookiesValues } from '@/utils/cookies';
import { Box, LinearProgress, Typography } from '@mui/material';
import bodyParser from 'body-parser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
// import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '../../utils/cookie';
import { decryptData, encryptDataGet } from '../..//utils/encryptDecrypt';
import { fetchLoginSuccess } from '../..//network/actions/login';
import axios from "../../network/api";
export async function getServerSideProps(context) {
	try {
		const { req } = context;


		// console.log(req, "server side props")

		// Parse request body using body-parser middleware
		await new Promise((resolve, reject) => {
			bodyParser.urlencoded({ extended: true })(req, null, resolve);
		});


		// console.log(req.body, "skjndasnjdkjasndjkasdnjk")
		const { token, user_id, role_id } = req.body || {};
		// console.log('before return')
		return {
			props: {
				data: {
					token: token || "",
					email: user_id || "",
					allData: req.body
				}
			}
		};
	} catch (error) {
		// console.log('Error fetching data:', error);
		return {
			props: {
				data: {
					message: 'Failed to fetch data',
					error: error.message || error.toString()
				}
			}
		};
	}
}



const VerifyParichay = ({ data }) => {
	const router = useRouter()
	const dispatch = useDispatch()

	// console.log("data login", router.query, data)

	useEffect(() => {


		const callApi = async () => {
			if (data?.token) {
				const response = await axios.get(
					`/userDetail?token=${data?.token}`
				).then(response => {
					console.log('response', response)
					let originalText = decryptData(response?.data?.data);
					console.log('originalText', originalText)
					dispatch(fetchLoginSuccess(originalText));
					// let newdata = {
					// 	"id": data?.allData?.id || 0,
					// 	"employeeNumber": null,
					// 	"employeeName": data?.email ||"",
					// 	"divisionCode": null,
					// 	"divisionName": null,
					// 	"subDivisionCode": null,
					// 	"subDivisionName": null,
					// 	"username": data?.allData?.userid || data?.allData?.user_id,
					// 	"employeeType": "",
					// 	"roles": []
					// }
					// saveToken(newdata);

					saveToken(originalText);
					router.push("/dashboard");
				}).catch(error => {
					console.log("error", error)
					alert(error?.response?.data?.message || "Something went wrong")
					router.push("/login");
					console.log('error', error)
				})

			}
		}
		callApi()

	}, [data])


	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Typography style={{ fontSize: 32 }} textAlign={"center"}>
				Please wait...
			</Typography>
			<Typography style={{ fontSize: 28 }} textAlign={"center"}>
				We are verifying your details
			</Typography>
			<LinearProgress variant="indeterminate" />
		</Box>
	)
}

export default VerifyParichay
