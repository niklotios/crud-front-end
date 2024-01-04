import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography,Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const InsertCategory = ({onCategoryAdded}) => {
    const [categoryName, setCategoryName] = useState('');
    const [error,setError]=useState('');
    const [snackbarOpen, setSnackbarOpen]= useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    useEffect(() => {
        if (snackbarOpen) {
          if (snackbarSeverity === 'success' && onCategoryAdded) {
            // Call the callback function passed from the parent component
            // to inform it that a category has been added successfully.
            onCategoryAdded();
          } else if (snackbarSeverity === 'error') {
            // Clear error state when Snackbar is closed
            setError('');
          }
        }
      }, [snackbarOpen, snackbarSeverity, onCategoryAdded]);

    const handleCloseSnackBar = () => {
        setSnackbarOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8080/api/v1/category`,{categoryName});
            setCategoryName('');
            setError('');
            setSnackbarMessage(' Category added succesfully! Please refresh page.');
            setSnackbarSeverity('success')
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error adding category')
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setError('Error adding category');
            console.error(error);
        }
    };

    return(
        <Paper elevation={3}>
            <Typography variant='h5'>Add New Category</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Category Name"
                fullWidth
                margin='normal'
                variant='outlined'
                value={categoryName}
                onChange={(e)=> setCategoryName(e.target.value)}
                />
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

export default InsertCategory;