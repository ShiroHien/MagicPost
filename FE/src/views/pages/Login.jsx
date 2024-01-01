import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useRef, useState, useEffect, useContext } from 'react'
import {TYPE_ACCOUNT} from '../../utils/constants'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate();  // Get the navigate function from React Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: user,
      password: pwd
    };

    console.log('data signin', data);

    try {
      const res = await axios.post(`http://localhost:3377/v1/accounts/signin`, data);

      console.log('result signin', res.data.result);
      console.log('centerInfo signin', res.data);

      if (res.data.result !== false) {
        Cookies.set('jwt', res.data.result);
        Cookies.set('info', JSON.stringify(res.data));

        const accountType = JSON.parse(Cookies.get('info')).typeAccount;

        if (accountType === TYPE_ACCOUNT.admin) {
          navigate('/leader');
        } else if (accountType === TYPE_ACCOUNT.leaderOfTransaction) {
          navigate('/managerDGD');
        } else if (accountType === TYPE_ACCOUNT.leaderOfWarehouse) {
          navigate('/managerDTK');
        } else if (accountType === TYPE_ACCOUNT.staffOfTransaction) {
          navigate('/staff');
        } else {
          navigate('/staffDTK');
        }
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (err) {
      console.log("Error from login", err);
    }

    setUser('');
    setPwd('');
    setSuccess(true);
  };

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);



  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#f54949' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Đăng nhập
          </Typography>

          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: '#e03d3d', '&&:hover': { backgroundColor: '#343a55' } }}
            >
              ĐĂNG NHẬP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}