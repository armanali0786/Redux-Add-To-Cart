import React,{useEffect}from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,removeItem ,setItems} from "../features/cartSlice";
import axios from "axios";
export default function App() {
  const items = useSelector((state) => state.allCart.items);

  const dispatch = useDispatch();
  const handleCartAction = (item) => {
    if (item.inCart) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        dispatch(setItems(response.data.products));
        console.log("",response.data.products)

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  if (!Array.isArray(items)) {
    return <div>Loading...</div>; // or render a loading spinner
  }
 
  return (
    <div className="m-3">
    <MDBContainer>
      <MDBRow className="mb-3">
        {items.map((item) => (
          <MDBCol key={item.id} size="md">
            <MDBCard className="m-3">
              <MDBCardImage src={item.images[0]} position="top" alt="Product Image" style={{width:"320.5px", height:"180px"}} />
              <MDBCardBody>
                <MDBCardTitle>{item.title}</MDBCardTitle>
                <MDBCardText>Price: {item.price}</MDBCardText>
                {item.inCart && (
                  <div>
                    <span> Quantity: {item.quantity}</span>
                  </div>
                )}
                <MDBBtn onClick={() => handleCartAction(item)}  color={item.inCart ? "danger" : "primary"}>
                {item.inCart ? "Remove from Cart" : "Add to Cart"}
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  </div>
  );
}




