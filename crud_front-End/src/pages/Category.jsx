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
} from "@mui/material";
import axios from "axios";

const Category = () => {
    const [category,setCategory] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:8080/api/v1/category")
        .then(response => setCategory(response.data))
        .catch(function (error){console.log(error)})
    },[]);

    return (
        <Container>
         <TableContainer>
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
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>   
        </Container>
    )

}

export default Category;