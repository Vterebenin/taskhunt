import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Zdog from './components/ZdogTest/Index'
import MainLayout from './components/MainLayout/Index'

function App() {
  return (
      <>
        <Zdog />
        <MainLayout />
      </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <Route path="/" component={App}/>
  </BrowserRouter>
  )
}

export default AppWrapper;
