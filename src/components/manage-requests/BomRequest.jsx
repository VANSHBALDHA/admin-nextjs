import React, { useState } from "react";
import inventoryItems from "~/data/inventoryData";
import * as XLSX from "xlsx";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaFolderPlus,
  FaUpload,
} from "react-icons/fa";
import "../master-management/manage-certificate/styles.css";
import Pagination from "../elements/basic/Pagination";
import { Button, DatePicker, Modal } from "antd";
import "./index.css";
import { BsUpload } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { MdDriveFolderUpload } from "react-icons/md";

const BomRequest = () => {
  const [addExcel, setAddExcel] = useState(false);
  const [editExcel, setEditExcel] = useState(false);

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const [excelData, setExcelData] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [date, setDate] = useState("");

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);

          const blob = new Blob([e.target.result], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
        setFileUrl(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  };

  const handleViewFile = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const onDateChange = (date) => {
    // console.log("Selected date (moment object):", date?.format("DD-MM-YYYY"));
    setDate(date?.format("DD-MM-YYYY"));
  };

  const handleAddExcel = () => {
    setAddExcel(true);
  };

  const handleCloseExcel = () => {
    setAddExcel(false);
  };

  const handleEditExcel = () => {
    setEditExcel(true);
  };

  const handleCloseEditExcel = () => {
    setEditExcel(false);
  };

  const handleDownload = () => {
    // Sample data for the Excel file
    const data = [
      { Name: "John Doe", Age: 28, Country: "USA" },
      { Name: "Anna Smith", Age: 22, Country: "UK" },
      { Name: "Peter Johnson", Age: 35, Country: "Canada" },
    ];

    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate a binary string for the workbook
    const binaryString = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    // Convert the binary string to a Blob
    const buffer = new ArrayBuffer(binaryString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryString.length; i++) {
      view[i] = binaryString.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";
    link.click();
  };

  const tableItems = inventoryItems.map((item, index) => {
    return (
      <tr className="text-center">
        <td>{item.id}</td>
        <td>test user</td>
        <td>05-06-2024</td>
        <td>
          <button className="btn btn-success" onClick={handleDownload}>
            Download Excel &nbsp; <FaDownload />
          </button>
        </td>
        <td>
          xyz.xlxs &nbsp;{" "}
          <FaDownload style={{ fontSize: "17px", cursor: "pointer" }} />
        </td>
        <td className="text-center">06-07-2024</td>
        <td>
          <div className="edit_view_btn">
            <GoPencil title="edit excel" onClick={() => handleEditExcel(item)} />
            <MdDriveFolderUpload title="upload excel" onClick={handleAddExcel} />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="ps-section__content">
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Customer Name</th>
                <th>Request Date</th>
                <th>Download Excel</th>
                <th>Uploaded Excel</th>
                <th>Uploaded Excel Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>{tableItems}</tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>Show 10 of 10 items.</p>
          <Pagination />
        </div>
      </div>

      {/* FOR ADD NEW EXCEL FORM */}
      <Modal
        title={
          <>
            <b>Add Excel</b>
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={() => setAddExcel(false)}>
            Save
          </Button>
        }
        open={addExcel}
        onCancel={() => setAddExcel(false)}
      >
        <div className="ps-block__content">
          <form className="form-group custom-form" onSubmit={handleFileSubmit}>
            <label htmlFor="">Upload Excel File</label>
            <label for="images" class="drop-container" id="dropcontainer">
              <span class="drop-title">Drop excel file here</span>
              or
              <input
                type="file"
                id="images"
                name="file"
                accept=".xlsx, .xls"
                onChange={handleFile}
                required
              />
            </label>
            <div className="d-flex justify-content-between">
              <div className="">
                {excelData ? (
                  <div>
                    {fileUrl && (
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ fontSize: "15px" }}
                        onClick={handleViewFile}
                      >
                        View Uploaded Excel
                      </button>
                    )}
                  </div>
                ) : (
                  <div>No File is uploaded yet!</div>
                )}
              </div>
              <button type="submit" className="upload_file_btn">
                UPLOAD <FaUpload />
              </button>
            </div>
            {typeError && (
              <div className="alert alert-danger" role="alert">
                {typeError}
              </div>
            )}
          </form>
          <div className="form-group">
            <label className="form-lable">
              Select Date<sup>*</sup>
            </label>
            <DatePicker
              format="DD-MM-YYYY"
              allowClear
              className="w-100"
              style={{ height: "50px" }}
              placeholder="Select date"
              onChange={onDateChange}
            />
          </div>
        </div>
      </Modal>

      {/* FOR EDIT EXCEL FORM */}
      <Modal
        title={
          <>
            <b>Edit Excel</b>
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={() => setEditExcel(false)}>
            Update
          </Button>
        }
        open={editExcel}
        onCancel={() => setEditExcel(false)}
      >
        <div className="ps-block__content">
          <form className="form-group custom-form" onSubmit={handleFileSubmit}>
            <label htmlFor="">Upload Excel File</label>
            <label for="images" class="drop-container" id="dropcontainer">
              <span class="drop-title">Drop excel file here</span>
              or
              <input
                type="file"
                id="images"
                name="file"
                accept=".xlsx, .xls"
                onChange={handleFile}
                required
              />
            </label>
            <div className="d-flex justify-content-between">
              <div className="">
                {excelData ? (
                  <div>
                    {fileUrl && (
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{ fontSize: "15px" }}
                        onClick={handleViewFile}
                      >
                        View Uploaded Excel
                      </button>
                    )}
                  </div>
                ) : (
                  <div>No File is uploaded yet!</div>
                )}
              </div>
              <button type="submit" className="upload_file_btn">
                UPLOAD <FaUpload />
              </button>
            </div>
            {typeError && (
              <div className="alert alert-danger" role="alert">
                {typeError}
              </div>
            )}
          </form>
          <div className="form-group">
            <label className="form-lable">
              Select Date<sup>*</sup>
            </label>
            <DatePicker
              format="DD-MM-YYYY"
              allowClear
              className="w-100"
              style={{ height: "50px" }}
              placeholder="Select date"
              onChange={onDateChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BomRequest;
