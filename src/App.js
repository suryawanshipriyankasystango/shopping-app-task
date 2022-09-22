import React, {useState, useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from "../src/components/cardList/CardList"
import Header from './components/header/Header';
import {ADD} from "./redux/action/ProductAction"
import { useDispatch, useSelector } from 'react-redux';
import Router from './Routes';


function App() {

  return (
    <>
      <Router />
    </>
  );
}

export default App;
