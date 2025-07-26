import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LoginUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token); // or use cookies if you prefer

      console.log("JWT Token:", data.token); // you now have the token

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }
      toast.success(data.message || "Login successfully!");
    } catch {
      console.log("Error in Signup");
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            //    minWidth: 275,
            width: "100vw",
          }}
        >
          <Card sx={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)" }}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 25 }}
              >
                Login
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
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
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  fontSize: "12px",
                }}
              >
                <Link href="/ForgotPass" underline="hover">
                  Forgot password ?
                </Link>
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="medium"
                onClick={LoginUser}
                disabled={!email || !password}
              >
                Login
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
              Dont have an account ?
              <Link href="/" underline="hover">
                Register
              </Link>{" "}
            </Typography>
          </Card>
        </Box>
      </motion.div>
    </>
  );
};

export default Login;
