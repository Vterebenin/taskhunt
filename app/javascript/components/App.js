import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Zdog from './components/ZdogTest/Index'
import configureStore from './redux/configureStore'
import MainLayout from './components/MainLayout/Index'
import "./App.css"

const store = configureStore()

function App() {
  return (
      <Provider store={store}>
        <Zdog />
        <MainLayout />
      </Provider>
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
