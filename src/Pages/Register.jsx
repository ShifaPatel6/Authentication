import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [resend, setResend] = useState("");
  const [otpFailed, setOtpFailed] = useState(false); // if OTP sending failed
  const [oldEmail, setOldEmail] = useState(""); // store once on signup

  const navigate = useNavigate();

  // console.log(name, email, password, "logging details");

  const [isLoading, setIsLoading] = useState(false);

  const SignupUser = async () => {
    try {
      setIsLoading(true); // Start loader
      console.log("loaing");

      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        setIsLoading(false); // Stop loader
        return;
      }

      alert("Registered successfully");
      setOldEmail(email); // save for reference

      //  Send OTP after signup
      const otpRes = await fetch("http://localhost:3000/otp-sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();
      console.log(otpData, "otpdata");

      if (!otpRes.ok || !otpData.status) {
        alert("Failed to send OTP , please enter valid email address.");
        setEmail("");
        setOtpFailed(true);

        setIsLoading(false);
        return;
      }
      // Clear form

      alert("OTP sent to your email.");

      setIsLoading(false);
      setEmail("");
      setMobile("");
      setName("");
      setPassword("");
      // Navigate to EmailVerify page after OTP sent
      navigate("/EmailVerify", {
        state: { email },
      });
    } catch (error) {
      console.error("Error in Signup", error);
      setIsLoading(false); // Stop loader on error
    }
  };
  const handleUpdateEmail = async () => {
    const res = await fetch("http://localhost:3000/update-email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldEmail,
        newEmail: email,
      }),
    });
    console.log("updat email reached");

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update email");
      return;
    }

    // Now resend OTP to new email
    await fetch("http://localhost:3000/otp-sent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("OTP sent");
    navigate("/EmailVerify", {
      state: { email },
    });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "gray",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          //    minWidth: 275,
          width: "100vw",
        }}
      >
        {/* {isLoading ? (
          <Box
            className="spinner "
            sx={{
              background: "white",
              borderRadius: "10px",
              color: "black",
              // padding: "2rem",
              width: "100px",
              textAlign: "center",
            }}
          >
            <h5>Loading...</h5>
          </Box>
        ) : ( */}
        <Card sx={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 25 }}
            >
              Register
            </Typography>
            <Typography variant="h5" component="div">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                  display: "flex",
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  // error
                  // id="outlined-error"
                  id="standard-basic"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Username"
                  variant="standard"
                  // helperText="Incorrect entry."
                />
                <TextField
                  // error
                  // id="outlined-error"
                  id="standard-basic"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="standard"
                  // helperText="Incorrect entry."
                />

                {otpFailed ? (
                  <div
                    // onClick={handleResendOTP}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: "12px",
                      cursor: email ? "pointer" : "not-allowed",
                      color: email ? "#1976d2" : "gray",
                      marginTop: "4px",
                      width: "96%",
                    }}
                    aria-disabled={!email}
                    role="button"
                    onClick={handleUpdateEmail}
                  >
                    Resend OTP
                  </div>
                ) : null}

                <TextField
                  // error
                  // id="outlined-error"
                  id="standard-basic"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  label="Mobile no"
                  variant="standard"
                  // helperText="Incorrect entry."
                />
                <TextField
                  id="standard-basic"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="standard"
                />
              </Box>
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" size="medium" onClick={SignupUser}>
              Register
            </Button>
          </CardActions>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              fontSize: "14px",
            }}
          >
            Already have an account ?
            <Link href="/" underline="hover">
              Login
            </Link>
          </Typography>
        </Card>
        {/* )} */}
      </Box>
    </>
  );
};

export default Register;
