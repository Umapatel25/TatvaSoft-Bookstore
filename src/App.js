// import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage.jsx';
import BooksList from './components/BooksList';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import globalStyles from './styles/globalStyles';
import Form from './components/Form';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify';

function App() {

  const theme = createTheme({

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'green'
          },
        },
      },
    },
  });


  return (

    <div>
      <ThemeProvider theme={theme} sx={{ color: 'red' }}>

        <BrowserRouter>
        <ToastContainer/>
          <div
            style={globalStyles.navbar}
       
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/BookList">BooksList</NavLink>
            <NavLink to="/form">Form</NavLink>
          </div>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/home' element={<HomePage username={'arman'} />}></Route>
            <Route path='/bookList' element={<BooksList />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>



    </div>
  );
}

export default App;
