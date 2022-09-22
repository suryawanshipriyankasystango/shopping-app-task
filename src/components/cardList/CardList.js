import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../card/Card"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {productAction} from "../../redux/action/ProductAction"
import { auth, fs } from '../../config/Config';
import Header from '../header/Header';


function CardList() {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList; 

  useEffect(() => {
    dispatch && dispatch(productAction());
  }, [dispatch]);

  // getting current use function
  function GetCurrentUser () {
    const [user, setUser] = useState(null);
    useEffect(() =>{
      auth.onAuthStateChanged(user => {
        if(user) {
          fs.collection('users').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data().FullName);
          })
        }
        else {
          setUser(null);
        }
      })
    },[])
    return user;
  }

  const user = GetCurrentUser();
  // console.log("getCurrentUser", user);

  return (
    <>
    <Header user={user} />
      {loading ? (
        <h2>Loading ...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : ( 
        products && products.length > 0 &&
        <Card products={products} />
      )}
    </>
  );
}

export default CardList;
