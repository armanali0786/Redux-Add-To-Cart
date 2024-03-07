
import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCartTotal } from "../features/cartSlice";

export default function App() {
  const { cart, totalQuantity } = useSelector((state) => state.allCart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log("user",user)
      setCurrentUser(user);
    }
  }, []);


  const logOut = () => {
    AuthService.logout();
  };

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>E-Commerce</MDBNavbarBrand>
        {currentUser ? (
          <>
             <MDBBtn color="light">
              <Link to="/products">All Products </Link>
              </MDBBtn>
            <MDBBtn color="light">
              <Link to="/cart">Cart <span style={{color:"red"}}>
              ({totalQuantity}) </span></Link>
            </MDBBtn>
            <MDBBtn color="light">
              <Link to="/login"  onClick={logOut} >Logout</Link>
            </MDBBtn>
          </>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </MDBContainer>
      {/* <ProductData/> */}
    </MDBNavbar>
  );
}
