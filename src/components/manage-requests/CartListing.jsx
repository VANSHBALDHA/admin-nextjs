"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import "./userCartList.scss";
import { Button, Modal } from "antd";
import { useDropzone } from "react-dropzone";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import { BsUpload } from "react-icons/bs";
import "../master-management/manage-certificate/styles.css";
import { GoPencil } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const CartListing = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editCartModel, setEditCartModel] = useState(false);

  const handleAddProduct = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleEditProduct = () => {
    setEditCartModel(true);
  };

  const handleEditProductClose = () => {
    setEditCartModel(false);
  };

  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("cartImages"));
    if (storedImages) {
      setFiles(storedImages.map((img) => ({ preview: img })));
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrorMessage("Only *.jpeg and *.png images will be accepted.");
        return;
      }
      if (acceptedFiles?.length) {
        if (files.length + acceptedFiles.length > 3) {
          setErrorMessage("You can only upload a maximum of 3 images.");
          return;
        }
        const newFiles = acceptedFiles
          .map((file) => {
            if (file.size > 5 * 1024 * 1024) {
              setErrorMessage("File size must be less than 5MB.");
              return null;
            }
            return file;
          })
          .filter(Boolean);

        const readers = newFiles.map((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          return new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
          });
        });

        Promise.all(readers).then((base64Strings) => {
          const updatedFiles = [
            ...files,
            ...base64Strings.map((base64String) => ({ preview: base64String })),
          ];
          localStorage.setItem(
            "cartImages",
            JSON.stringify(updatedFiles.map((file) => file.preview))
          );
          setFiles(updatedFiles);
          setErrorMessage("");
        });
      }
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    maxFiles: 3,
  });

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    localStorage.setItem(
      "cartImages",
      JSON.stringify(updatedFiles.map((file) => file.preview))
    );
    setErrorMessage("");
  };

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__actions">
          <button className="ps-btn success" onClick={handleAddProduct}>
            <i className="icon icon-plus mr-2" />
            Add Cart Item
          </button>
        </div>
        <table className="table  ps-table--shopping-cart ps-table--responsive">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="ps-product--cart">
                  <div className="ps-product__thumbnail">
                    <Link href="/">
                      <img src="https://placehold.co/400x400" alt="" />
                    </Link>
                  </div>
                  <div className="ps-product__content">
                    Unero Military Classical Backpack
                  </div>
                </div>
              </td>
              <td data-label="code" className="price">
                #ASD23
              </td>
              <td data-label="price" className="price">
                ₹65.99
              </td>
              <td data-label="quantity">
                <div className="form-group--number">
                  <button className="up">+</button>
                  <button className="down">-</button>
                  <input
                    className="form-control"
                    type="text"
                    disabled={true}
                    value="14"
                  />
                </div>
              </td>
              <td data-label="total">
                <strong>₹65.99</strong>
              </td>
              <td>
                <div className="edit_view_btn">
                  <GoPencil onClick={handleEditProduct} />
                  <RxCross2 />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="ps-product--cart">
                  <div className="ps-product__thumbnail">
                    <Link href="/">
                      <img src="https://placehold.co/400x400" alt="" />
                    </Link>
                  </div>
                  <div className="ps-product__content">
                    Unero Military Classical Backpack
                  </div>
                </div>
              </td>
              <td data-label="code" className="price">
                #ASD23
              </td>
              <td data-label="price" className="price">
                ₹65.99
              </td>
              <td data-label="quantity">
                <div className="form-group--number">
                  <button className="up">+</button>
                  <button className="down">-</button>
                  <input className="form-control" type="text" disabled={true} />
                </div>
              </td>
              <td data-label="total">
                <strong>₹65.99</strong>
              </td>
              <td>
                <div className="edit_view_btn">
                  <GoPencil />
                  <RxCross2 />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ps-section__cart-actions">
          <Link href="/manage-request/cart" className="ps-btn">
            Back to Cart
          </Link>
        </div>
      </div>
      <div className="ps-section_footer">
        <div className="row justify-space-between">
          <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-lg-6">
                <figure>
                  <figcaption>Coupon Discount</figcaption>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter coupon here..."
                    />
                  </div>
                  <div className="form-group">
                    <button className="ps-btn ps-btn--outline">Apply</button>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="ps-block--shopping-total">
              <div className="ps-block__header">
                <p>
                  Subtotal <span>₹23.99</span>
                </p>
              </div>
              <div className="ps-block__header">
                <p>
                  Discount <span>₹10.00</span>
                </p>
              </div>
              <div className="ps-block__content">
                <ul className="ps-block__product">
                  <li>
                    <span className="ps-block__estimate">
                      <Link href="/" className="ps-product__title">
                        Unero Military Classical Backpack
                        <br />x 1
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span className="ps-block__estimate">
                      <Link href="/" className="ps-product__title">
                        Unero Military Classical Backpack
                        <br />x 1
                      </Link>
                    </span>
                  </li>
                </ul>
                <h3>
                  Total <span>₹13.99</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOR ADD NEW PRODUCTS IN USER CART MODEL */}
      <Modal
        title={
          <>
            <h4>Add Cart Items</h4>
            <hr />
          </>
        }
        visible={modalVisible}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button type="primary" onClick={handleModalClose}>
            Save
          </Button>,
        ]}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Code<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter product code"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Name<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product quantity"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Price<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product discount"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Total<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product total"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Upload Product Images<sup>*</sup>
                </label>
                <div>
                  <div {...getRootProps()} className="upload_box">
                    <input {...getInputProps()} />
                    <BsUpload className="mb-3" />
                    <p>Drag & drop some files here, or click to select files</p>
                    <em>(Only *.jpeg and *.png image will be accepted)</em>
                  </div>
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Uploaded Images</label>
                <div className="d-flex" style={{ gap: "20px" }}>
                  {files?.map((file, index) => (
                    <div
                      key={index}
                      className="position-relative uploaded_img_box"
                    >
                      <Image
                        src={file?.preview}
                        alt={`Uploaded file ${index + 1}`}
                        width={100}
                        height={100}
                        className="img_preview"
                        onLoad={() => URL.revokeObjectURL(file?.preview)}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="img_cancle"
                      >
                        <IoIosCloseCircleOutline />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* FOR EDIT USER CART PRODUCTS MODEL */}
      <Modal
        title={
          <>
            <h4>Edit Cart Items</h4>
            <hr />
          </>
        }
        visible={editCartModel}
        onCancel={handleEditProductClose}
        width={800}
        footer={[
          <Button type="primary" onClick={handleEditProductClose}>
            Update
          </Button>,
        ]}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Code<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter product code"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Name<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product quantity"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Price<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product discount"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Product Total<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter product total"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Upload Product Images<sup>*</sup>
                </label>
                <div>
                  <div {...getRootProps()} className="upload_box">
                    <input {...getInputProps()} />
                    <BsUpload className="mb-3" />
                    <p>Drag & drop some files here, or click to select files</p>
                    <em>(Only *.jpeg and *.png image will be accepted)</em>
                  </div>
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Uploaded Images</label>
                <div className="d-flex" style={{ gap: "20px" }}>
                  {files?.map((file, index) => (
                    <div
                      key={index}
                      className="position-relative uploaded_img_box"
                    >
                      <Image
                        src={file?.preview}
                        alt={`Uploaded file ${index + 1}`}
                        width={100}
                        height={100}
                        className="img_preview"
                        onLoad={() => URL.revokeObjectURL(file?.preview)}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="img_cancle"
                      >
                        <IoIosCloseCircleOutline />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CartListing;
