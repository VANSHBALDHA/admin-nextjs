"use client";

import React, { useState } from "react";
import { Modal, InputNumber, Form, Select } from "antd";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import "./index.css";
import { useRouter } from "next/navigation";
import Pagination from "../elements/basic/Pagination";
import "../master-management/manage-certificate/styles.css";

const { Option } = Select;

const QuoteRequest = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [quoteItems, setQuoteItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample data for a single quote request
  const quoteData = {
    id: 1,
    quoteNumber: "QUOTE-001",
    customerName: "John Doe",
    date: "2024-07-08",
    status: "Expired",
    quoteItems: [
      {
        id: 1,
        productCode: "P001",
        productName: "Product A",
        price: 50,
        quantity: 2,
      },
      {
        id: 2,
        productCode: "P002",
        productName: "Product B",
        price: 30,
        quantity: 1,
      },
    ],
  };

  const handleEdit = () => {
    setQuoteItems(quoteData.quoteItems.map((item) => ({ ...item }))); // Clone quote items for editing
    setModalVisible(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the modal
    setSelectedProduct(null); // Reset selected product
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    console.log("Saving changes:", quoteItems);
    setModalVisible(false); // Close the modal after saving
  };

  const handleQuantityChange = (value, id) => {
    // Find the item by id and update its quantity
    const updatedQuoteItems = quoteItems.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setQuoteItems(updatedQuoteItems);
  };

  const handlePriceChange = (value, id) => {
    // Find the item by id and update its price
    const updatedQuoteItems = quoteItems.map((item) =>
      item.id === id ? { ...item, price: value } : item
    );
    setQuoteItems(updatedQuoteItems);
  };

  const handleDeleteProduct = (id) => {
    // Filter out the item to delete based on id
    const updatedQuoteItems = quoteItems.filter((item) => item.id !== id);
    setQuoteItems(updatedQuoteItems);
  };

  const handleAddProduct = () => {
    // Add the selected product to quoteItems
    if (selectedProduct) {
      const newQuoteItem = {
        id: quoteItems.length + 1, // Generate a unique id
        productCode: selectedProduct.productCode,
        productName: selectedProduct.productName,
        price: selectedProduct.defaultPrice || 0,
        quantity: 1,
      };
      setQuoteItems([...quoteItems, newQuoteItem]);
      setSelectedProduct(null); // Reset selected product after adding
    }
  };

  const handleProductSelectChange = (value) => {
    // Find the selected product from available products
    const product = availableProducts.find(
      (prod) => prod.productCode === value
    );
    setSelectedProduct(product);
  };

  const availableProducts = [
    { productCode: "P001", productName: "Product A", defaultPrice: 50 },
    { productCode: "P002", productName: "Product B", defaultPrice: 30 },
    { productCode: "P003", productName: "Product C", defaultPrice: 40 },
    { productCode: "P004", productName: "Product D", defaultPrice: 60 },
    { productCode: "P005", productName: "Product E", defaultPrice: 70 },
    { productCode: "P006", productName: "Product F", defaultPrice: 80 },
  ];

  return (
    <>
      <div className="ps-section__content">
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quote Number</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quoteData.id}</td>
                <td>{quoteData.quoteNumber}</td>
                <td>{quoteData.customerName}</td>
                <td>{quoteData.date}</td>
                {/* <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      router.push(
                        `/manage-request/quotes/quotes-list/${quoteData.quoteNumber}`
                      )
                    }
                    style={{ fontSize: "14px" }}
                    disabled={quoteData.status === "Order Confirmed"}
                  >
                    <GoPencil />
                  </button>
                </td> */}
                <td
                  onClick={() =>
                    router.push(
                      `/manage-request/quotes/quotes-list/${quoteData.quoteNumber}`
                    )
                  }
                  className="edit_view_btn"
                >
                  <GoPencil />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>Show 10 of 10 items.</p>
          <Pagination />
        </div>
      </div>

      <Modal
        title={
          <>
            <h4>Quotes Request:</h4>
            <hr />
          </>
        }
        visible={modalVisible}
        onCancel={handleModalClose}
        width={700}
        footer={[
          <button
            key="addProduct"
            className="btn btn-primary"
            style={{ fontSize: "14px", marginRight: "10px" }}
            onClick={handleAddProduct}
          >
            <FaPlus /> Add Product
          </button>,
          <button
            key="cancel"
            className="btn btn-secondary"
            style={{ fontSize: "14px", marginRight: "10px" }}
            onClick={handleModalClose}
          >
            Cancel
          </button>,
          <button
            key="save"
            className="btn btn-primary"
            style={{ fontSize: "14px" }}
            onClick={handleSaveChanges}
          >
            Save
          </button>,
        ]}
      >
        {/* <table className="table ps-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quoteItems.map((item) => (
              <tr key={item.id}>
                <td>{item.productCode}</td>
                <td>{item.productName}</td>
                <td>
                  <InputNumber
                    min={1}
                    step={0.01}
                    value={item.price}
                    onChange={(value) => handlePriceChange(value, item.id)}
                  />
                </td>
                <td>
                  <InputNumber
                    min={1}
                    max={10}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(value, item.id)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Form style={{ marginTop: "20px" }}>
          <Form.Item label="Select Product">
            <Select
              style={{ width: "100%" }}
              placeholder="Select a product"
              value={selectedProduct ? selectedProduct.productCode : undefined}
              onChange={handleProductSelectChange}
            >
              {availableProducts.map((product) => (
                <Option key={product.productCode} value={product.productCode}>
                  {product.productName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form> */}
      </Modal>
    </>
  );
};

export default QuoteRequest;
