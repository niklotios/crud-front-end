import { useEffect,useState } from "react";
import Container from "@mui/material/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { flexbox } from "@mui/system";

const Category = () => {
    const [category,setCategory] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:8080/api/v1/category")
        .then(response => setCategory(response.data))
        .catch(function (error){console.log(error)})
    },[]);

    const handleDelete = (categoryId) => {
        axios.delete(`http://localhost:8080/api/v1/category/${categoryId}`)
        .then((response)=>{
            axios.get("http://localhost:8080/api/v1/category")
            .then(response => setCategory(response.data))
        })
        .catch(function (error){console.log(error)})
      };

    return (
       
        <Grid container direction="column" xs={12} alignItems="center" justifyContent={"center"}>
        <Grid
         item 
         className="classes.centerColumn"
         display="flex"
         justifyContent={"center"}
        >
         <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Category Name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {category.map((category)=> (
                    <TableRow key={category.categoryId}>
                        <TableCell>{category.categoryName}</TableCell>
                        <TableCell>
                            <Button
                            variant="contained"
                            color="error"
                            onClick={()=> handleDelete(category.categoryId)}
                            endIcon={<DeleteIcon/>}>
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
       
    )

}

export default Category;