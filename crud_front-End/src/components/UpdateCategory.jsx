// UpdateCategory.jsx

import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateCategory = ({ onUpdateCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  useEffect(() => {
    if (snackbarOpen) {
      if (snackbarSeverity === 'success' && onUpdateCategory) {
        onUpdateCategory();
      } else if (snackbarSeverity === 'error') {
        setError('');
      }
    }
  }, [snackbarOpen, snackbarSeverity, onUpdateCategory]);

  const handleCloseSnackBar = () => {
    setSnackbarOpen(false);
  };

  const handleFindCategoryId = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/category/findIdByName/${categoryName}`);
      return response.data;
    } catch (error) {
      console.error('Error finding category by name:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryId = await handleFindCategoryId();
      console.log(categoryId);

      console.log(typeof newCategoryName);
      console.log(newCategoryName);
      await axios.put(`http://localhost:8080/api/v1/category/${categoryId}`, newCategoryName,{
        headers:{"Content-Type":"text/plain"}
      });
      
      setCategoryName('');
      setNewCategoryName('');
      setError('');
      setSnackbarMessage('Category updated successfully! Please refresh page.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error updating category');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setError('Error updating category');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5">Update Category</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <TextField
          label="New Category Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackBar}>
        <Alert onClose={handleCloseSnackBar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UpdateCategory;
