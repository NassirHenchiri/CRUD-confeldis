import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table} from 'react-bootstrap';



class ProductList extends Component {
      constructor(props) {
        super(props);
        this.state = {
          emps: [],
        }  
        
      }
    
    getProducts() {
      axios.get('http://localhost:4080/products')
      .then(res => {
        const emps = res.data;
        this.setState({ emps });
        console.log(res.data);
          })
    }    
    
    componentDidMount() {
        this.getProducts();
    }

    delete(productId) {  
      const { emps } = this.state;     
     axios.delete('http://localhost:4080/product/' + productId).then(result=>{  
       alert(result.data.message);  
        this.setState({  
          response:result,  
          emps:emps.filter(product=>product.id !== productId)  
        });  
      });  
    }

    render(){         
      const{error,emps}=this.state;  
      if(error){  
          return(  
              <div>Error:{error.message}</div>  
          )  
      }  
      else  
      {  
          return(  
       <div>  
                    
                <Table>  
                  <thead className="btn-primary">  
                    <tr>  
                      <th>Reference</th>  
                      <th>Nom de produit</th>  
                      <th>prix Unitaire</th>  
                      <th>Quantité</th>   
                      <th>Action</th>  
                    </tr>  
                  </thead>  
                  <tbody>  
                    {emps.map(emp => (  
                      <tr key={emp.id}>  
                        <td>{emp.ispr}</td>  
                        <td>{emp.product_name}</td>  
                        <td>{emp.price}</td>  
                        <td>{emp.quantity}</td>    
                        <td><Button variant="info" onClick={() => this.props.editProduct(emp.id)}>Editer</Button>       
                        <Button variant="danger" onClick={() => this.delete(emp.id)}>Supprimer</Button>  
                        
                        </td>  
                      </tr>  
                    ))}  
                  </tbody>  
                </Table>  
              </div>
            )  
      }  
  }  
}  

    export default ProductList;