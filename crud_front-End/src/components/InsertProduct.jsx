import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography,Snackbar, Alert } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const InsertProduct = ({onProductAdded}) => {
    const [productName, setProductName]= useState('');
    const [price,setPrice]=useState('');
    const [productSerial, setProductSerial]=useState('');
    const [categoryName, setCategoryName]= useState('');

    const [error,setError]=useState('');
    const [snackbarOpen, setSnackbarOpen]= useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    //const {productName, price, productSerial, categoryName}=inputs;

    useEffect(() => {
        if (snackbarOpen) {
          if (snackbarSeverity === 'success' && onProductAdded) {
            // Call the callback function passed from the parent component
            // to inform it that a category has been added successfully.
            onProductAdded();
          } else if (snackbarSeverity === "error") {
            // Clear error state when Snackbar is closed
            setError('');
          }
        }
      }, [snackbarOpen, snackbarSeverity, onProductAdded]);

    const handleCloseSnackBar = () => {
        setSnackbarOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8080/api/v1/product`,{
                productName,
                productSerial,
                price,
                categoryName,
            });
            setError('');
            setSnackbarMessage(' Product added succesfully!');
            setSnackbarSeverity('success')
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error adding product')
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setError('Error adding product');
            console.error(error);
        }
    };

    return(
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h5'>Add New Category</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Product Name"
                fullWidth
                margin='normal'
                variant='outlined'
                value={productName}
                onChange={(e)=> setProductName(e.target.value)}
                />
                <TextField 
                label="Price"
                fullWidth
                margin='normal'
                variant='outlined'
                value={price}
                onChange={(e)=> setPrice(e.target.value)}/>

                <TextField 
                label="Serial Number"
                fullWidth
                margin='normal'
                variant='outlined'
                value={productSerial}
                onChange={(e)=> setProductSerial(e.target.value)}/>

                <TextField 
                label="Category"
                fullWidth
                margin='normal'
                variant='outlined'
                value={categoryName}
                onChange={(e)=>setCategoryName(e.target.value)}/>

                <Button type='submit' variant='contained' color='primary'>
                    Add 
                </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    )
}

export default InsertProduct;