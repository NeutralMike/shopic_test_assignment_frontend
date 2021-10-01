import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../actions/authActions';
import { IAppState } from '../store/store';
import Typography from '@mui/material/Typography';



export default function LoginForm() {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const errors = useSelector<IAppState, any>((state: IAppState) => state.authState.errors);

  const dispatch = useDispatch();
  

  return (
    <Stack spacing={2}>
      <TextField
        required
        error={errors.username ? true : false}
        helperText={errors.username}
        id="username"
        placeholder="Username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        required
        error={errors.password ? true : false}
        helperText={errors.password}
        id="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errors?.general ? <Typography sx={{color: 'red'}}>{errors.general}</Typography> : ''}
      <Button type="submit" variant="contained" onClick={() => dispatch(LoginAction(username, password))}>
        Log in
      </Button>
    </Stack>
  );
}
