import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ADD } from "../../redux/action/ProductAction"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carts from "../card/Card.js"

const Search = (props) => {
    const products = props.products
    console.log("search", products)
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const sendData = (e) => {
        console.log('sendData', e)
        dispatch(ADD(e))
    }

  return (
    <>
    <div className="templateContainer">
      <div className="searchInput_Container">
        <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />
      </div>
      
      <div className="template_Container">
        <Row>
        {
          products.filter((product) => {
              if(searchTerm == ""){
                return product;
              }else if(product.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return product;
              }
            })
            .map((product) => {
                const { image, title, price, id } = product;
              return(
                <Col key={id} lg={3} md={4} sm={6} xs={12}>
                    <Card>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <div className='cardTitleBox'>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    <p className='cardDesc' style={{ color: "gray", fontWeight: "300", fontSize: "14px" }}>{product.title}</p>
                                </Card.Text>
                            </div>
                            <div className="button_div d-flex justify-content-center">
                                <Button onClick={() => sendData(product)}
                                    className='col-lg-12 addCartBtn'>Add to Cart</Button>
                            </div>
                            <Card.Text>
                                <p className='mt-2' style={{ color: "gray", fontWeight: "300", fontSize: "14px" }}><strong style={{ color: "#222", fontWeight: "600" }}>$ {price / 2}</strong> <del>{price}</del> <span style={{ color: "red" }}>(50% off)</span></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
              )
            })
        }
        </Row>
      </div>
    </div>
  </>
  )
}

export default Search