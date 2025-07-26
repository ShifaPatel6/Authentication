import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpFailed, setOtpFailed] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const SignupUser = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors); // field-wise errors
        } else {
          toast.error(data.message || "Something went wrong");
        }
        setIsLoading(false);
        return;
      }

      setErrors({}); // clear old errors

      // Send OTP
      const otpRes = await fetch("http://localhost:3000/otp-sent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok || !otpData.status) {
        toast.error("Failed to send OTP, please enter a valid email address.");
        setOtpFailed(true);
        setIsLoading(false);
        return;
      }

      toast.success("OTP sent to your email.");
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setIsLoading(false);

      navigate("/EmailVerify", {
        state: { email },
      });
    } catch (error) {
      toast.error("Signup Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100vw",
      }}
    >
      <Card sx={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)" }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 25 }}
          >
            Register
          </Typography>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "35ch" },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Username"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              label="Mobile no"
              variant="standard"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />

            <TextField
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="medium"
            onClick={SignupUser}
            disabled={!email || !password || !name || !mobile}
          >
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
          Already have an account?{" "}
          <Link href="/Login" underline="hover" sx={{ marginLeft: "4px" }}>
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Register;
