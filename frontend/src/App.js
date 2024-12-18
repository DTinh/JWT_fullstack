import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import AppRoutes from './routes/AppRoutes';
import { BallTriangle } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';


function App() {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <Router>
        {
          user && user.isLoading ?
            <div className='loading-container'>
              <BallTriangle
                height="80"
                width="80"
                color="#1877f2"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <div>Loading data...</div>
            </div>

            :
            <>
              <div className='app-header'>
                <NavHeader />
              </div>
              <div className='app-container'>
                <AppRoutes />
              </div>
            </>
        }


      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>

  );
}
export default App;

