import React from 'react';  
import { Row, Form, Col, Button } from 'react-bootstrap';  
  
class AddProd extends React.Component {  
  constructor(props) {  
    super(props);  
   
    this.initialState = {  
      id: '',  
      ispr: '',  
      product_name: '',  
      price: '',  
      quantity: '',
    }  
  
    if (props.product.id) {  
      this.state = props.product  
    } else {  
      this.state = this.initialState;  
    }  
  
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
  
  }  
  


  handleChange(event) {  
    const name = event.target.name;  
    const value = event.target.value;  
  
    this.setState({  
      [name]: value  
    })  
  }  
  
  handleSubmit(event) {  
    event.preventDefault(); 
    this.props.onFormSubmit(this.state);  
    this.setState(this.initialState);  
  }  
  render() {  
    let pageTitle;  
    let actionStatus;  
    if (this.state.id) {  
  
      pageTitle = <h2>Editer produit</h2>  
      actionStatus = <b>Update</b> 
    } else {  
      pageTitle = <h4>Ajouter produit</h4>  
      actionStatus = <b>Save</b>  
    }  
  
    return (  
      <div>        
        <h1> {pageTitle}</h1>  
        <Row>  
          <Col sm={7}>  
            <Form onSubmit={this.handleSubmit}>  
              <Form.Group controlId="ispr">  
                <Form.Label>Référence</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="ispr"  
                  value={this.state.ispr}  
                  onChange={this.handleChange}  
                  placeholder="reference" />  
              </Form.Group>  
              <Form.Group controlId="product_name">  
                <Form.Label>Nom de produit</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="product_name"  
                  value={this.state.product_name}  
                  onChange={this.handleChange}  
                  placeholder="nom de produit" />  
              </Form.Group>  
              <Form.Group controlId="price">  
                <Form.Label>Prix Unitaire</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="price"  
                  value={this.state.price}  
                  onChange={this.handleChange}  
                  placeholder="Prix Unitaire" />  
              </Form.Group>  
              <Form.Group controlId="availability">  
                <Form.Label>Quantité</Form.Label>  
                <Form.Control  
                  type="text"  
                  name="quantity"  
                  value={this.state.quantity}  
                  onChange={this.handleChange}  
                  placeholder="Quantité" />  
              </Form.Group>   
              <Form.Group>  
                <Form.Control type="hidden" name="id" value={this.state.id} />  
                <Button variant="success" type="submit">{actionStatus}</Button>            
  
              </Form.Group>  
            </Form>  
          </Col>  
        </Row>  
      </div>  
    )  
  }  
}  
  
export default AddProd;