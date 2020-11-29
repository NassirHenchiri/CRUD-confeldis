import React, { Component } from 'react';  
  
import { Container, Button } from 'react-bootstrap';  
import ProductList from './ProductList';  
import AddProd from './AddProd';  
import axios from 'axios';  
  
class App extends Component {  
  constructor(props) {  
    super(props);  
  
    this.state = {  
      isAddProd: false,  
      error: null,  
      response: {},  
      productData: {},  
      isEditProd: false,  
    }  

      
    this.onFormSubmit = this.onFormSubmit.bind(this);  
  
  }  
  
  onCreate() {  
    this.setState({ isAddProd: true });  
  }  
   
  
  onFormSubmit(data) {  
    this.setState({ isAddProd: true });  
    let body = {
      product : {
        ispr: data.ispr,  
        product_name: data.product_name,  
        price: data.price,  
        quantity: data.quantity,  
      }
  }

    if (this.state.isEditProduct) {  
     axios.put(`http://localhost:4080/product/${data.id}`, body).then(result => {  
      alert(result.data.message);  
        this.setState({  
          response:result,    
          isAddProd: false,  
          isEditProd: false,
        })  
      });  
    } else {
      axios.post('http://localhost:4080/product', body).then(result => {  
        alert(result.data.message);  
          this.setState({  
            response:result,    
            isAddProd: false,  
            isEditProd: false  
          })  
        });
    }
    
  }  
  
  editProduct = productId => {    
   axios.get("http://localhost:4080/product/" + productId).then(result => {  
  
        this.setState({  
          isEditProd: true,  
          isAddProd: true,  
          productData: result.data.data
                     
        });  
      },  
      (error) => {  
        this.setState({ error });  
      }  
    )       
  }  
  
  render() {  
    
    let productForm;  
    if (this.state.isAddProd || this.state.isEditProd) {    
      productForm = <AddProd onFormSubmit={this.onFormSubmit} product={this.state.productData} />  
    }  
    return (  
      <div className="App">  
 <Container>  
        <h1 style={{ textAlign: 'center' }}>Crud Henchiri Nassir </h1>  
        <hr></hr>  
        {!this.state.isAddProd && <Button variant="primary" onClick={() => this.onCreate()}>Ajouter produit</Button>}  
        <br></br>  
        {!this.state.isAddProd && <ProductList editBook={this.editProduct} />}  
        {productForm}  
        </Container>  
      </div>  
    );  
  }  
}  
export default App;  