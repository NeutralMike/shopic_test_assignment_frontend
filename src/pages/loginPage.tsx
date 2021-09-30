import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import { IAppState } from '../store/store';


const LoginPage = () => {
  const isAuthed = useSelector((state: IAppState) => state.authState.isAuthed);
  let history = useHistory();

  if (isAuthed) {
    history.push("/");
  }

  return (
    <Grid 
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
      <LoginForm />
    </Grid>
  );
}

export default LoginPage;