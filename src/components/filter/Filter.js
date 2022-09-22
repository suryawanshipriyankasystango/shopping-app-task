import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ADD } from "../../redux/action/ProductAction"
import "./Filter.css";

const Filter = (props) => {
    const products = props.products
    // console.log('products', products)

    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);
    const [filter, setFilter] = useState(products);
    // console.log("filterfilter", filter);
    const [order, setOrder] = useState("dsc")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const filterByPrice = () => {
        if (order === "asc") {
            const sorted = [...filter].sort((a, b) =>
                a > b ? 1 : -1
            )
            setFilter(sorted)
            setOrder("dsc")
        }
        if (order === "dsc") {
            const sorted = [...filter].sort((a, b) =>
                a < b ? 1 : -1
            )
            setFilter(sorted)
            setOrder("asc")
        }
    }



    const filterByCategory = (categoryItem) => {
        const updatedItems = products.filter((currentElement) => {

            return currentElement.category === categoryItem;
        })
        console.log("currentElement", updatedItems);
        if (updatedItems) {
            props.setFilterCheck(true)
        } else {
            props.setFilterCheck(false)
        }
        setFilter(updatedItems);
    }


    const sendData = (e) => {
        console.log('sendData', e)
        dispatch(ADD(e))
    }

    console.log("filterrr", filter)

    return (
        <>
            <Container>
                <div className='filterWrapper' style={{marginBottom : "20px"}}>
                    <ul>
                        <li><p>Home</p></li>
                        <li><p>Clothing</p></li>
                        <li><p>Mens Clothing</p></li>
                        <li><p>All Mens Clothing</p></li>
                    </ul>
                    <div className='TotalProducts'>
                        <h2>All Products <span>{products.length}</span></h2>
                    </div>
                    <div className='filterSec'>
                        <div className='filterLeftSec'>
                            <h5>Filters: </h5>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab onClick={() => setFilter(products)} label="All Products" />
                                <Tab onClick={() => filterByCategory("men's clothing")} label="men's clothing" />
                                <Tab onClick={() => filterByCategory("jewelery")} label="jewelery" />
                                <Tab onClick={() => filterByCategory("electronics")} label="electronics" />
                                <Tab onClick={() => filterByCategory("women's clothing")} label="women's clothing" />
                            </Tabs>
                        </div>
                        <div className='filterRightSec'>
                            <DropdownButton id="dropdown-basic-button" title="Sort by price">
                            <Dropdown.Item onClick={() => filterByPrice("price")} >Price Low To High</Dropdown.Item>
                            <Dropdown.Item onClick={() => filterByPrice("price")}>Price High To Low</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <div className='filterProductWrapper'>
                    <Row>
                        {filter &&
                            filter.map((product, index) => {
                                const { image, title, price, id } = product;
                                return (
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
            </Container>
        </>
    )
}

export default Filter