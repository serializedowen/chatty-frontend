import React from "react";
import axios from "../config/axios";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Cookie from "../utils/cookie";

export default function Signup() {
  const signUp = () => {
    axios
      .post("/signup", {
        username: values.username,
        password: values.password
      })

      .then(res => {
        axios.defaults.headers.common = { Authorization: `${res.data}` };
        Cookie.setCookie("chattytoken", res.data);
      })
      .then(() => console.log(axios.defaults.headers))

      .catch(err => console.log(err));
  };

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  //   const validator =

  return (
    <form>
      <FormControl required>
        <InputLabel htmlFor="username">Username</InputLabel>

        <Input
          id="username"
          type="text"
          value={values.username}
          onChange={handleChange("username")}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        {/* <WithValidation component={Input} /> */}
        <Input
          id="adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          required
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <Input
          id="confirm-password"
          type={values.showPassword ? "text" : "password"}
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={signUp}>
        注册
      </Button>
    </form>
  );
}
