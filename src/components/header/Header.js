import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Dropdown from 'react-bootstrap/Dropdown';
import Logo from '../assets/images/logo.png'
import CartGif from '../assets/images/cart.gif'
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import './Header.css';
import Invites from "../invites/Invites"
import { useDispatch, useSelector } from 'react-redux';
import { DELETE } from "../../redux/action/ProductAction"
import Table from 'react-bootstrap/esm/Table';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../../config/Config';
import { useHistory } from 'react-router-dom';

const Header = ({ user }) => {

  const history = useHistory();

  const [price, setPrice] = useState(0); // create state for getting total price of the cart product list
  // console.log("setPricesetPrice", price);

  const cartsData = useSelector((state) => state.cartList.carts);
  const dispatch = useDispatch();

  const dlt = (id) => {
    dispatch(DELETE(id)) // remove product from carts
  }

  const total = () => {
    let price = 0;
    cartsData.map((product, index) => {
      price = product.price + price
    });
    setPrice(price);
  }

  useEffect(() => {
    total();
  }, [total])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login")
    })
  }

  return (
    <>
      <Container>
        <div className='HeaderWrapper'>
          <div className='LogoWrapper'>
            <img src={Logo} alt="Logo" />
          </div>
          {!user && <>
            <div className='userLogoutWrapper'>
              <Link to="login"> Login </Link>
              <Link to="signup"> SignUp </Link>
            </div>
          </>}

          {user && <>
            <div className='menuIconWrapper'>
              <div className='MenuWrapper'>
                <Link to='/'>Shop</Link>
                <Link to='about'>About us</Link>
                <Link to='contact'>Contact</Link>
              </div>
              <div className="d-flex p-2 navMenuIcons">
                <a><p className='search'><input type="text"
                /> <span><SearchIcon /></span></p></a>
                <div className='userName'>
                  <a onClick={handleLogout}> <LogoutIcon /> </a>
                  <Link to="/">{user}</Link>
                </div>
                <Badge badgeContent={cartsData.length} color="primary"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <i class="fa-solid fa-cart-shopping" style={{ fontSize: 25, cursor: "pointer" }}></i>
                </Badge>
              </div>
            </div>
          </>}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          {cartsData.length ?
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Product Name</th>
                </tr>
              </thead>

              {cartsData.map((product, index) => {
                const { image, title, price, id } = product;
                return (

                  <tbody>
                    <tr>
                      <td>
                        <Link to={`/cart/${product.id}`} onClick={handleClose}>
                          <img src={image} style={{ width: "5rem", height: "5rem" }} alt="" />
                        </Link>
                      </td>
                      <td>
                        <p>{title}</p>
                        <p>Price : ${price}</p>
                      </td>

                      <td>
                        <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(id)}>
                          <i className='fas fa-trash smalltrash'></i>
                        </p>
                      </td>
                    </tr>
                  </tbody>

                )
              })
              }

              <p className='text-center'>Total :$ {price}</p>
            </Table> :
            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
              <i class="fa-solid fa-xmark smallclose"
                onClick={handleClose}
                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
              <p style={{ fontSize: 22 }}>Your cart is empty !</p>
              <img src={CartGif} alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
            </div>

          }
        </Menu>
      </Container>
      <Invites />
    </>
  )
}

export default Header