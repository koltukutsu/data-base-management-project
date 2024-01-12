import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice';
import api from '../../api';

const defaultTheme = createTheme();

export default function Authentication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    try {
      const response = await api.authenticateUser(username, password);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const userId = data[0].id;
        const userData = await api.getUserInfo(userId);
        const username = userData[0].username;
        const balance = userData[0].balance;
        const acceptedOffers = userData[0].accepted_offer_count;

        dispatch(login({ userId: userId, username: username, wallet: balance, acceptedOffers: acceptedOffers }));
        navigate('/home');
      } else {
        alert('Kullanıcı adı veya şifre hatalı');
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const [signUpFormData, setSignUpFormData] = React.useState({
    signUpUsername: '',
    signUpPassword: '',
  });

  const handleSignUpFormChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('signUpUsername');
    const password = data.get('signUpPassword');

    try {
      console.log('Sign-up form submitted:', signUpFormData);
      const response = await api.addUser(username, password);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const userId = data.id;
        const userData = await api.getUserInfo(userId);
        const username = userData[0].username;
        const balance = userData[0].balance;
        const acceptedOffers = userData[0].accepted_offer_count;

        dispatch(login({ userId: userId, username: username, wallet: balance, acceptedOffers: acceptedOffers }));

        navigate('/home');
        alert(`Kullanıcı başarıyla oluşturuldu.
        1000 para hediye edildi.
        Trigger Kullanıldı: 
CREATE OR REPLACE FUNCTION insert_into_balance() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO balance (user_id, amount)
VALUES (NEW.id, 1000);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER insert_into_balance_trigger
AFTER
INSERT ON users FOR EACH ROW EXECUTE FUNCTION insert_into_balance();`);
      } else {
        alert('Kullanıcı  oluşturulamadı');
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  const [sectionMode, setSectionMode] = React.useState('sign-in');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            {/* Buttons to switch between sign-in and sign-up sections */}
            <Button
              onClick={() => setSectionMode('sign-in')}
              variant={sectionMode === 'sign-in' ? 'contained' : 'outlined'}
              color="primary"
            >
              Giriş Yap
            </Button>
            <Button
              onClick={() => setSectionMode('sign-up')}
              variant={sectionMode === 'sign-up' ? 'contained' : 'outlined'}
              color="primary"
              sx={{ marginLeft: 1 }}
            >
              Kayıt Ol
            </Button>
          </Box>
          {sectionMode === 'sign-in' ? (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Hesabınla Giriş Yap
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Kullanıcı Adı"
                name="username" isChosenOffer
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Giriş Yap
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignUpSubmit} noValidate sx={{ mt: 1 }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h2" variant="h6" sx={{ mt: 0 }}>
                Kayıt Ol
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="signUpUsername"
                label="Kullanıcı Adı"
                name="signUpUsername"
                autoComplete="username"
                onChange={handleSignUpFormChange}
                value={signUpFormData.signUpUsername}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="signUpPassword"
                label="Şifre"
                type="password"
                id="signUpPassword"
                autoComplete="new-password"
                onChange={handleSignUpFormChange}
                value={signUpFormData.signUpPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Kayıt Ol
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
