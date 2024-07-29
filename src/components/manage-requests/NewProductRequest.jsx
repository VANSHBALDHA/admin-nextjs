import React, { useState } from "react";
import Pagination from "../elements/basic/Pagination";

const NewProductRequest = () => {
  const products = [
    {
      id: 1,
      customerName: "John Doe",
      companyName: "Tech Solutions Ltd.",
      productName: "Laptop",
      brandName: "Dell",
      contact: "555-123-4567",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      companyName: "Innovatech Inc.",
      productName: "Smartphone",
      brandName: "Apple",
      contact: "555-234-5678",
    },
    {
      id: 3,
      customerName: "Michael Johnson",
      companyName: "Gadget Works",
      productName: "Tablet",
      brandName: "Samsung",
      contact: "555-345-6789",
    },
    {
      id: 4,
      customerName: "Emily Brown",
      companyName: "ElectroMart",
      productName: "Headphones",
      brandName: "Sony",
      contact: "555-456-7890",
    },
    {
      id: 5,
      customerName: "Chris Lee",
      companyName: "TechHub",
      productName: "Smartwatch",
      brandName: "Garmin",
      contact: "555-567-8901",
    },
  ];

  const [searchCustomerText, setSearchCustomerText] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  const handleSearchCustomerTextChange = (e) => {
    setSearchCustomerText(e.target.value);
  };

  const handleSearchCompanyTextChange = (e) => {
    setSearchCompany(e.target.value);
  };

  const filteredItems = products.filter((item) => {
    return (
      item.productName
        .toLowerCase()
        .includes(searchCustomerText.toLowerCase()) &&
      item.companyName.toLowerCase().includes(searchCompany.toLowerCase())
    );
  });

  const tableItems = filteredItems.map((item, index) => {
    return (
      <tr>
        <td>{item.id}</td>
        <td>{item?.customerName}</td>
        <td>{item?.companyName}</td>
        <td>{item?.productName}</td>
        <td>{item?.brandName}</td>
        <td className="text-start">{item?.contact}</td>
      </tr>
    );
  });

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <div className="ps-form__left ps-form--filter">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search by Customer Name"
                  style={{ height: "50px" }}
                  value={searchCustomerText}
                  onChange={handleSearchCustomerTextChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search by Company Name"
                  style={{ height: "50px" }}
                  value={searchCompany}
                  onChange={handleSearchCompanyTextChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>Product Name</th>
                <th>Brand Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                tableItems
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    <b>No Request Found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>
            Show {filteredItems.length} of {products.length} items.
          </p>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default NewProductRequest;
