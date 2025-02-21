import { Refresh } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import { createCanvas } from "canvas";
import {
	forwardRef,
	useImperativeHandle,
	useEffect,
	useRef,
	useState,
} from "react";

// import { Input } from "antd";
// import NumericInput from "../NumericInput";

const Captcha = forwardRef(({ captcha, setCaptcha }, ref) => {
	const [captchaImage, setCaptchaImage] = useState(null);
	const [captchaText, setCaptchaText] = useState(null);
	const [userText, setUserText] = useState();
	const imgRef = useRef();

	const generateRandomString = (length) => {
		const characters = "0123456789";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return result;
	};

	const generateCaptchaImage = () => {
		const width = 110;
		const height = 40;
		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext("2d");

		const captchaText = generateRandomString(6);
		setCaptchaText(captchaText);

		ctx.fillStyle = "lightgray";
		ctx.fillRect(0, 0, width, height);
		ctx.font = "24px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(captchaText, 10, 30);

		return canvas.toDataURL("image/png");
	};

	useEffect(() => {
		const image = generateCaptchaImage();
		setCaptchaImage(image);
	}, []);

	useEffect(() => {
		if (userText && captchaText && userText === captchaText) {
			setCaptcha(true);
		} else {
			setCaptcha(false);
		}
	}, [userText]);

	const refreshCaptcha = () => {
		const image = generateCaptchaImage();
		setCaptchaImage(image);
		setCaptcha(false);
		setUserText("");
	};

	useImperativeHandle(ref, () => ({
		refreshCaptcha,
	}));

	return (
		<Grid container>
			<Grid item xs={6}>
				<div style={{ position: "relative", maxWidth: "128px" }}>
					<img ref={imgRef} src={captchaImage} alt="CAPTCHA" />
					<Refresh
						style={{
							position: "absolute",
							right: "0",
							bottom: "4px",
							fontSize: "20px",
							color: "#311B92",
							cursor: "pointer",
						}}
						onClick={refreshCaptcha}
					/>
				</div>
			</Grid>
			<Grid item xs={6}>
				<input
                type="number"
					maxLength={6}
					className="captchaInput"
					value={userText}
					size={"medium"}
					label={"Enter Captcha"}
					onChange={(e) => {
						setUserText(e.target.value);
					}}
				/>

				{/* <TextField
                    focused
                    size="small"
                    required
                    error={!captcha && userText !== null}
                    onChange={(e) => setUserText(e.target.value)}
                    fullWidth
                    label="Captcha"
                    variant="outlined"
                /> */}
			</Grid>
		</Grid>
	);
});

Captcha.displayName = "Captcha";

export default Captcha;
