import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import "./CardDetail.css"

const CardDetail = () => {

  const [data,setData] = useState([]);
  // console.log("datadata",data);

  const cartsData = useSelector((state)=> state.cartList.carts);
  console.log(cartsData);

  const {id} = useParams();
  console.log(id);

  const compareCart = () => {
    let comparedata = cartsData.filter((product) => {
      return product.id == id
    });
    setData(comparedata);
  }

  useEffect(()=>{
    compareCart();
  },[id])

  return (
    <div className='CardDetailWrapper'>
      <Header />
      <Container>
        
          {data ? data.map((product, index)=>(
            <Row className='cartDetailWrapper' style={{marginBottom:"15px"}}>
              <Col lg={6}>
                <img className='cartDetailImg' src={product.image} alt="image" />
              </Col>
              <Col lg={6}>
                <div className='detailBody'>
                  <h5>{product.title}</h5>
                  <h6>{product.price}</h6>
                  <p>{product.description}</p>
                  <Button variant="secondary" style={{marginTop:"70px"}}>Buy Now</Button>
                </div>
              </Col>
            </Row>
          )):""}
      </Container>
    </div>
  )
}

export default CardDetail