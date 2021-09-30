import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../actions/authActions';



export default function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  

  return (
    <Stack spacing={2}>
      <Input
        required
        id="username"
        placeholder="Username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        required
        id="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" onClick={() => dispatch(LoginAction(username, password))}>
        Log in
      </Button>
    </Stack>
  );
}
