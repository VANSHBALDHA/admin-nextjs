import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Modal, Select } from "antd";
import productsData from "~/data/productsData";
import { FaEdit, FaEye } from "react-icons/fa";
import "../master-management/manage-certificate/styles.css";
import combinedData from "~/data/subToSubCategoryData";
import brandData from "~/data/brandData";
import { useDropzone } from "react-dropzone";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import Image from "next/image";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import certificateData from "~/data/certificateData";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import Pagination from "../elements/basic/Pagination";
import { GoPencil } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

// pdfjs.GlobalWorkerOptions.workerSrc =
//   "../../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

const ManageProduct = () => {
  const router = useRouter();

  const [addProduct, setAddProduct] = useState(false);

  const [edtProductModel, setEditProductModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const [viewProductModel, setViewProductModel] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    subCategoryName: "",
    status: "",
    categoryName: "",
  });

  const [shortContent, setShortContent] = useState("");
  const [longContent, setLongContent] = useState("");

  const handleEditProduct = (item) => {
    setEditProductModel(true);
    setLoading(true);
    setCurrentItem(item);
    setFormData({
      subCategoryName: item?.subCategoryName,
      status: item?.status,
      categoryName: item?.categoryName,
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleUpdateProduct = () => {
    const updatedData = productsData.map((item) =>
      item.id === currentItem.id
        ? {
            ...item,
            subCategoryName: formData?.subCategoryName,
            status: formData.status,
            categoryName: formData?.categoryName,
          }
        : item
    );
    setEditProductModel(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  const handleViewProduct = () => {
    setViewProductModel(true);
    setViewLoading(true);

    setTimeout(() => {
      setViewLoading(false);
    }, 500);
  };

  const tableItems = productsData.map((item) => {
    let statusView;
    if (item.status === "active") {
      statusView = <span className="ps-badge success">Active</span>;
    } else {
      statusView = <span className="ps-badge gray">InActive</span>;
    }
    return (
      <tr key={item.productCode}>
        <td>{item.productCode}</td>
        <td>
          <strong>{item.productName}</strong>
        </td>
        {/* <td>
          <span>{item.manufactureName}</span>
        </td> */}
        <td>
          <span>{item.displayQuantity}</span>
        </td>
        <td>
          <span>{item.reservedQuantity}</span>
        </td>
        <td>
          <span>{item.salesQuantity}</span>
        </td>
        <td>{statusView}</td>
        <td>
          <button
            className="btn btn-success"
            style={{ fontSize: "13px" }}
            onClick={() =>
              router.push(
                `manage-products/add-features/${item.productName
                  .toLowerCase()
                  .replace(/ /g, "-")}`
              )
            }
          >
            Add Features
          </button>
        </td>
        <td>
          <div className="edit_view_btn">
            <IoEyeOutline onClick={handleViewProduct} />
            <GoPencil onClick={() => handleEditProduct(item)} />
          </div>
        </td>
      </tr>
    );
  });

  const handleAddProduct = () => {
    setAddProduct(true);
  };

  const handleCloseProduct = () => {
    setAddProduct(false);
  };

  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("productImages"));
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
            "productImages",
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
      "productImages",
      JSON.stringify(updatedFiles.map((file) => file.preview))
    );
    setErrorMessage("");
  };

  const [pdfs, setPdfs] = useState([]);
  const [pdfErrorMessage, setPdfErrorMessage] = useState("");

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("productPdfs"));
    if (storedPdfs) {
      setPdfs(storedPdfs.map((pdf) => ({ preview: pdf })));
    }
  }, []);

  const onDropPdf = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setPdfErrorMessage("Only *.pdf files will be accepted.");
        return;
      }
      if (acceptedFiles?.length) {
        if (pdfs.length + acceptedFiles.length > 2) {
          setPdfErrorMessage("You can only upload a maximum of 2 PDFs.");
          return;
        }
        const newFiles = acceptedFiles
          .map((file) => {
            if (file.size > 10 * 1024 * 1024) {
              setPdfErrorMessage("File size must be less than 10MB.");
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
            ...pdfs,
            ...base64Strings.map((base64String) => ({ preview: base64String })),
          ];
          localStorage.setItem(
            "productPdfs",
            JSON.stringify(updatedFiles.map((file) => file.preview))
          );
          setPdfs(updatedFiles);
          setPdfErrorMessage("");
        });
      }
    },
    [pdfs]
  );

  const { getRootProps: getRootPropsPdf, getInputProps: getInputPropsPdf } =
    useDropzone({
      onDrop: onDropPdf,
      accept: "application/pdf",
      maxFiles: 2,
    });

  const removePdf = (index) => {
    const updatedPdfs = pdfs.filter((_, i) => i !== index);
    setPdfs(updatedPdfs);
    localStorage.setItem(
      "productPdfs",
      JSON.stringify(updatedPdfs.map((file) => file.preview))
    );
    setPdfErrorMessage("");
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "video",
    "font",
    "size",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleShortContentChange = (newContent) => {
    setShortContent(newContent);
    console.log("setShortContent", newContent);
  };

  const handleLongContentChange = (newContent) => {
    setLongContent(newContent);
    console.log("setLongContent", newContent);
  };

  return (
    <>
      <div className="ps-section__actions">
        <button className="ps-btn success" onClick={handleAddProduct}>
          <i className="icon icon-plus mr-2" />
          New Product
        </button>
      </div>
      <div className="ps-section__header">
        <div className="ps-section__filter"></div>
        <div className="ps-section__search">
          <form
            className="ps-form--search-simple"
            action="index.html"
            method="get"
          >
            <input
              className="form-control"
              type="text"
              placeholder="Search product"
            />
            <button>
              <i className="icon icon-magnifier"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table ps-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              {/* <th>Manufacture Name</th> */}
              <th>Display Quan.</th>
              <th>Reserved Quan.</th>
              <th>Sales Quan.</th>
              <th>Status</th>
              <th></th>
              <th style={{ textAlign: "end" }}>Action</th>
            </tr>
          </thead>
          <tbody>{tableItems}</tbody>
        </table>
      </div>

      <div className="ps-section__footer">
        <p>Show 10 of 10 items.</p>
        <Pagination />
      </div>

      {/* FOR ADD NEW PRODUCT MODAL */}

      <Modal
        title={
          <>
            <h4>Add Product</h4>
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleCloseProduct}>
            Save
          </Button>
        }
        open={addProduct}
        onCancel={() => setAddProduct(false)}
        width={1000}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Select Sub-sub Category<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  allowClear={true}
                  style={{ height: "50px" }}
                  placeholder="Select sub category"
                  options={combinedData?.map((data) => ({
                    value: data?.id,
                    label: data?.subCategoryName,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Select Brand<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  allowClear={true}
                  style={{ height: "50px" }}
                  placeholder="Select brand"
                  options={brandData?.map((data) => ({
                    value: data?.id,
                    label: data?.brandName,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Manufacturer Part NO.<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter manufacturer part no."
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Minimum Purchase Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter minimum purchase quantity"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Minimum Stock Qty. Warning<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter minimum stock qty warning"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Selling Price (Per Item)<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter selling price"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  MRP<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter MRP"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Display Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter display quantity"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">Select Certificate</label>
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  allowClear={true}
                  mode="multiple"
                  placeholder="Select certificate"
                  options={certificateData?.map((data) => ({
                    value: data?.id,
                    label: data?.name,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">
                  Status<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  placeholder="Select status"
                  options={[
                    {
                      value: "active",
                      label: "Active",
                    },
                    {
                      value: "inactive",
                      label: "InActive",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group" style={{ height: "300px" }}>
                <label>
                  Short Discription<sup>*</sup>
                </label>
                <QuillEditor
                  value={shortContent}
                  theme="snow"
                  onChange={handleShortContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: "200px" }}
                  placeholder="Enter your content...."
                  className=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group" style={{ height: "300px" }}>
                <label>
                  Long Discription<sup>*</sup>
                </label>
                <QuillEditor
                  value={longContent}
                  theme="snow"
                  onChange={handleLongContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: "200px" }}
                  placeholder="Enter your content...."
                  className=""
                />
              </div>
            </div>
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
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Upload Datasheet<sup>*</sup>
                </label>
                <div>
                  <div {...getRootPropsPdf({ className: "upload_box" })}>
                    <input {...getInputPropsPdf()} />
                    <BsUpload className="mb-3" />
                    <p>Drag & drop some files here, or click to select files</p>
                    <em>(Only *.pdf file will be accepted)</em>
                  </div>
                  {pdfErrorMessage && (
                    <p className="text-danger">{pdfErrorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group">
                <label>Uploaded PDF</label>
                <div className="d-flex" style={{ gap: "20px" }}>
                  <div className="preview_wrapper">
                    {pdfs.map((pdf, index) => (
                      <>
                        <div key={index} className="preview_item">
                          <Document
                            file={{ data: atob(pdf.preview.split(",")[1]) }}
                            onLoadError={(error) =>
                              console.log("Error loading PDF:", error)
                            }
                          >
                            <Page pageNumber={1} width={100} />
                          </Document>
                          <IoIosCloseCircleOutline
                            className="close_icon"
                            onClick={() => removePdf(index)}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Modal>

      {/* FOR EDIT PRODUCT DETAILS MODAL */}
      <Modal
        title={
          <>
            <h4>Edit Sub Category Details</h4>
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleUpdateProduct}>
            Save
          </Button>
        }
        loading={loading}
        width={1000}
        open={edtProductModel}
        onCancel={() => setEditProductModel(false)}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Select Sub-sub Category<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  allowClear={true}
                  style={{ height: "50px" }}
                  placeholder="Select sub category"
                  options={combinedData?.map((data) => ({
                    value: data?.id,
                    label: data?.subCategoryName,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Select Brand<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  allowClear={true}
                  style={{ height: "50px" }}
                  placeholder="Select brand"
                  options={brandData?.map((data) => ({
                    value: data?.id,
                    label: data?.brandName,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Manufacturer Part NO.<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter manufacturer part no."
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Minimum Purchase Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter minimum purchase quantity"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Minimum Stock Qty. Warning<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter minimum stock qty warning"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Selling Price (Per Item)<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter selling price"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  MRP<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter MRP"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Display Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder="Enter display quantity"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">Select Certificate</label>
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  mode="multiple"
                  placeholder="Select certificate"
                  options={certificateData?.map((data) => ({
                    value: data?.id,
                    label: data?.name,
                  }))}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">
                  Status<sup>*</sup>
                </label>
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  placeholder="Select status"
                  options={[
                    {
                      value: "active",
                      label: "Active",
                    },
                    {
                      value: "inactive",
                      label: "InActive",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group" style={{ height: "300px" }}>
                <label>
                  Short Discription<sup>*</sup>
                </label>
                <QuillEditor
                  value={shortContent}
                  theme="snow"
                  onChange={handleShortContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: "200px" }}
                  placeholder="Enter your content...."
                  className=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group" style={{ height: "300px" }}>
                <label>
                  Long Discription<sup>*</sup>
                </label>
                <QuillEditor
                  value={longContent}
                  theme="snow"
                  onChange={handleLongContentChange}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ height: "200px" }}
                  placeholder="Enter your content...."
                  className=""
                />
              </div>
            </div>
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
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Upload Datasheet<sup>*</sup>
                </label>
                <div>
                  <div {...getRootPropsPdf({ className: "upload_box" })}>
                    <input {...getInputPropsPdf()} />
                    <BsUpload className="mb-3" />
                    <p>Drag & drop some files here, or click to select files</p>
                    <em>(Only *.pdf file will be accepted)</em>
                  </div>
                  {pdfErrorMessage && (
                    <p className="text-danger">{pdfErrorMessage}</p>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group">
                <label>Uploaded PDF</label>
                <div className="d-flex" style={{ gap: "20px" }}>
                  <div className="preview_wrapper">
                    {pdfs.map((pdf, index) => (
                      <>
                        <div key={index} className="preview_item">
                          <Document
                            file={{ data: atob(pdf.preview.split(",")[1]) }}
                            onLoadError={(error) =>
                              console.log("Error loading PDF:", error)
                            }
                          >
                            <Page pageNumber={1} width={100} />
                          </Document>
                          <IoIosCloseCircleOutline
                            className="close_icon"
                            onClick={() => removePdf(index)}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Modal>

      {/* FOR VIEW PRODUCT DETAILS MODAL */}

      <Modal
        title={
          <>
            <h4>View product - P001</h4>
            <hr />
          </>
        }
        maskClosable={false}
        loading={viewLoading}
        footer={null}
        width={1000}
        open={viewProductModel}
        onCancel={() => setViewProductModel(false)}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Product Code</label>
                <input className="form-control" value="P001" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  className="form-control"
                  value="Wireless Headphones"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Sub-sub Category Name</label>
                <input
                  className="form-control"
                  value="Wireless Headphones"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Brand Name</label>
                <input
                  className="form-control"
                  value="Wireless Headphones"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Manufacturer Part NO.</label>
                <input className="form-control" value="GBE1S3" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Minimum Purchase Quantity</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Minimum Stock Qty. Warning</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Selling Price (Per Item)</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>MRP</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Display Quantity</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Reserved Quantity</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Sales Quantity</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">Certificates</label>
                <input className="form-control" value="20" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-lable">Status</label>
                <input className="form-control" value="Active" disabled />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Short Discription</label>
                <textarea
                  className="form-control"
                  rows="4"
                  disabled
                  placeholder=""
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  Duis sagittis ipsum. Praesent mauris.
                </textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Long Discription</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder=""
                  disabled
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  Duis sagittis ipsum. Praesent mauris.
                </textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Uploaded Product Images</label>
                <div>
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.2wTlnzhSr-LUVkJyWxYdhQHaEK&pid=Api&rs=1&c=1&qlt=95&w=215&h=120"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Upload Data sheets</label>
                <div>
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.2wTlnzhSr-LUVkJyWxYdhQHaEK&pid=Api&rs=1&c=1&qlt=95&w=215&h=120"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageProduct;
