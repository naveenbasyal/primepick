import React, { useContext, useEffect, useState } from "react";
import { SellerContext } from "../../Context/SellerProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../../Styles/AllProducts.scss";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useFormik } from "formik";
import EditProductOverlay from "./EditProductOverlay";

const AllProducts = () => {
  const navigate = useNavigate();
  const { sellerProducts, setSellerProducts } = useContext(SellerContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState();

  const previewProduct = (product) => {
    const productNameWithHyphens = product.name.replace(/\s+/g, "-");
    navigate(`/product/${productNameWithHyphens}/${product._id}`);
  };

  const handleDeleteProduct = async (deleteProductId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("primepick-seller")
          )}`,
        },
      };
      setLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/admin/deleteproduct/${deleteProductId}`,
        config
      );
      setSellerProducts(
        sellerProducts.filter((product) => product._id !== deleteProductId)
      );
      console.log(res);
      setShowConfirmDelete(false);
      setProductToDelete(null);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  const openConfirmDeleteDialog = (product) => {
    setProductToDelete(product);
    setShowConfirmDelete(true);
  };

  const closeConfirmDeleteDialog = () => {
    setShowConfirmDelete(false);
    setProductToDelete(null);
  };

  const openEditProductDialog = (product) => {
    setShowEditProduct(true);
    setProductToEdit(product);
  };
  const closeEditProductDialog = (product) => {
    setShowEditProduct(false);
    setProductToEdit(null);
  };

  return (
    <div className="my-3 allproducts mulish">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>Rs.{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button onClick={() => previewProduct(product)}>
                    <Visibility />
                  </Button>
                </TableCell>
                <TableCell>
                  {/* Button to Edit the product */}
                  <IconButton
                    className="edit-btn"
                    aria-label="edit"
                    onClick={() => openEditProductDialog(product)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Button to delete the product */}
                  <IconButton
                    className="delete-btn"
                    aria-label="delete"
                    onClick={() => openConfirmDeleteDialog(product)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* _______ Edit Product Overlay ______ */}

      <Dialog
        open={showEditProduct}
        onClose={closeEditProductDialog}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edit Product</DialogTitle>
        <DialogContent style={{width:"600px"}}>
          <EditProductOverlay
            product={productToEdit}
            setProductToEdit={setProductToEdit}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation Overlay Dialog */}
      <Dialog
        open={showConfirmDelete}
        onClose={closeConfirmDeleteDialog}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            style={{
              width: "5rem",
              padding: "0.5rem",
            }}
            onClick={() => handleDeleteProduct(productToDelete?._id)}
            color="primary"
            variant="contained"
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllProducts;
