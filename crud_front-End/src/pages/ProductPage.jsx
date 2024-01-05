import React, {useState,useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductPage = () => {
    const {categoryName} = useParams();
    const [products,setProducts]= useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/v1/product/${categoryName}`)
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));
    },[categoryName]);

    const handleDelete = (productId) => {
        console.log(productId);
        axios.delete(`http://localhost:8080/api/v1/product/${productId}`)
        .then((response)=> {
            axios.get(`http://localhost:8080/api/v1/product/${categoryName}`)
            .then(response => setProducts(response.data))
        })
        .catch(function (error){console.log(error)})
    };

    return (

        <Grid container direction="column" alignItems="center" justifyContent={"center"} spacing={3}>
            <Grid item xs={12}>Products for Category {categoryName}</Grid>
            <Grid item xs={6} display={"flex"} justifyContent={"center"}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Serial No.</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product.productId}>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>{product.price} €</TableCell>
                                    <TableCell>{product.productSerial}</TableCell>
                                    <TableCell>
                                        <Button 
                                        variant="contained"
                                        color="error"
                                        endIcon={<DeleteIcon/>}
                                        onClick={()=> handleDelete(product.productId)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        // <div>
        //   <h2>Products for Category {categoryName}</h2>
        //   <ul>
        //     {products.map(product => (
        //       <li key={product.productId}>{product.price}</li>
        //     ))}
        //   </ul>
        // </div>
      );
    
}

export default ProductPage;