import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import LinearProgress from "@mui/material/LinearProgress";

const Emailverify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = Array(4).fill(0);
  const inputRefs = useRef([]);
  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Only allow 1 digit (numbers)
    if (!/^\d?$/.test(value)) return;

    e.target.value = value;

    // Move to next input
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
      console.log(value, index);
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    const isOtpComplete = otp.every((digit) => digit !== "");

    if (isOtpComplete) {
      const verifyOtp = async () => {
        const Otpverify = otp.join("");
        console.log(Otpverify, "verify");

        try {
          const res = await fetch("http://localhost:3000/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, Otpverify }),
          });

          const data = await res.json();

          if (!res.ok || !data.status) {
            alert(data.message || "OTP verification failed");
            return;
          }

          alert("OTP Verified Successfully");
        } catch (err) {
          alert("Error verifying OTP");
        }
      };

      verifyOtp();

      setIsLoading(true);
      setTimeout(() => {
        navigate("/Login", { state: { email } });
      }, 5000);
      setIsLoading(false);
    }
  }, [otp]);

   




  return (
    <>
      <Box
        sx={{
          backgroundColor: "gray",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          //    alignItems: "center",
          textAlign: "center",
          //    minWidth: 275,
          width: "100vw",
        }}
      >
        <Card
          sx={{
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
            height: "45vh",
            margin: "4rem",
            width: "50vw",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 25 }}
            >
              Verify Email Account
            </Typography>
            <h5>
              Please verify your email account by entering OTP we have sent you
              at {email}
            </h5>
            <Box
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: "7ch",
                  textAlign: "center",
                },
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {inputs.map((_, i) => (
                <TextField
                  key={i}
                  inputRef={(el) => (inputRefs.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center" },
                  }}
                  variant="outlined"
                />
              ))}
            </Box>
            {isLoading ? (
              <Box sx={{ width: "100%", marginTop: "11px" }}>
                <LinearProgress />
              </Box>
            ) : null}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "rows",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              If you didn't receive the OTP,{" "}
              {/* <Link href="#" underline="hover"> */}
              Resend OTP
              {/* </Link> */}
              <TextField id="outlined-basic" label="email" variant="outlined" />
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "center" }}
          ></CardActions>
        </Card>
      </Box>
    </>
  );
};

export default Emailverify;
