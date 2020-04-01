import React, { SyntheticEvent, MutableRefObject } from 'react';
import axios from '../config/axios';
import reactdom from 'react-dom';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useValidation, { PromiseAllPass } from '../utils/useValidation';

import Cookie from '../utils/cookie';
import { TextField } from '@material-ui/core';

// Input.prototype.Validate = () => console.log("validate");

type Props = {
  callback?: Function;
  portal?: MutableRefObject<Element>;
};

export default function Login(props: Props) {
  const login = () => {
    PromiseAllPass([triggerName(), triggerPass()])
      .then(i => {
        console.log(i);
        return i;
      })
      .then(valid => {
        if (valid) {
          debugger;
          return axios
            .post('/login', {
              username,
              password
            })

            .then(res => {
              console.log(res);
              Cookie.setCookie('token', res.data);
            })
            .then(() => {
              if (typeof props.callback === 'function') {
                return props.callback();
              }
            })
            .catch(e => {});
        }
      });
  };

  const [
    username,
    setusername,
    errName,
    errNameMsg,
    triggerName
  ] = useValidation(val => {
    if (val === '') {
      throw new Error('username cant be empty');
    }
  });

  // const a = useValidation(val => {
  //   if (val === '') {
  //     throw new Error('username cant be empty');
  //   }
  // });

  // const b = React.useState('');

  const [
    password,
    setpassword,
    errPass,
    errPassMsg,
    triggerPass
  ] = useValidation(val => {
    if (val === '') {
      throw new Error('username cant be empty');
    }
  });

  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const getActionButtons = () => (
    <Button variant="contained" color="primary" onClick={login}>
      登陆
    </Button>
  );

  return (
    <form>
      <FormControl required>
        <TextField
          id="username"
          type="text"
          label="Username"
          required
          onBlur={triggerName}
          error={errName}
          helperText={errNameMsg}
          value={username}
          onChange={e => setusername(e.target.value)}
        />
      </FormControl>
      <FormControl>
        {/* <WithValidation component={Input} /> */}
        <TextField
          id="adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={password}
          error={errPass}
          helperText={errPassMsg}
          onBlur={triggerPass}
          required
          label="Password"
          onChange={e => setpassword(e.target.value)}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FormControl>
      {/* <Button variant="contained" color="primary" onClick={login}>
        登陆
      </Button> */}
      {!props.portal && getActionButtons()}
      {props.portal &&
        props.portal.current &&
        reactdom.createPortal(getActionButtons(), props.portal.current)}
    </form>
  );
}

// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';

// const f = () => {
//   console.log('object');
//   return '';
// };

// const g = () => {
//   return 0;
// };
// export default function Index() {
//   const [state, setstate] = React.useState(f());
//   const [abc, setabc] = useState(g());

//   console.log('render');
//   return <Button onClick={() => setabc(abc + 1)}>a</Button>;
// }
