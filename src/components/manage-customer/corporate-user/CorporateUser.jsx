"use client";

import { Modal, Select, Switch } from "antd";
import React, { useState } from "react";
import "../../master-management/manage-certificate/styles.css";
import Pagination from "~/components/elements/basic/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const CorporateUser = () => {
  const router = useRouter();

  const customers = [
    {
      name: "Anisa Forster",
      date: "15-06-2022",
      balance: "211.00",
      orders: "10",
      status: "true",
      customer_type: "gst company",
      custoemer_id: 1,
      last_login_date: "10-06-2024", // Example date
    },
    {
      name: "Hashir Wilson",
      date: "15-06-2022",
      balance: "211.00",
      orders: "10",
      status: "false",
      customer_type: "non-gst company",
      custoemer_id: 2,
      last_login_date: "20-06-2024", // Example date
    },
    {
      name: "Grover Sampson",
      date: "15-06-2022",
      balance: "211.00",
      orders: "10",
      status: "true",
      customer_type: "gst company",
      custoemer_id: 3,
      last_login_date: "25-06-2024", // Example date
    },
    {
      name: "Nelson Mckeown",
      date: "15-06-2022",
      balance: "211.00",
      orders: "10",
      status: "false",
      customer_type: "non-gst company",
      custoemer_id: 4,
      last_login_date: "30-06-2024", // Example date
    },
  ];

  const [viewCustomer, setViewCustomer] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [viewCustomerData, setViewCustomerData] = useState("");

  const [searchName, setSearchName] = useState("");

  const handleViewCustomer = (item) => {
    setViewCustomerData(item);
    setViewCustomer(true);
    setViewLoading(true);

    setTimeout(() => {
      setViewLoading(false);
    }, 500);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.name.toLowerCase().includes(searchName.toLowerCase());
  });

  const tableItemsView = filteredCustomers.map((item, index) => {
    let badgeView;

    if (item.status) {
      badgeView = <span className="ps-badge success">active</span>;
    } else {
      badgeView = <span className="ps-badge gray">deactive</span>;
    }

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <strong>{item.name}</strong>
        </td>
        <td>{item.customer_type}</td>
        <td>{item.date}</td>
        <td>{item.last_login_date}</td>
        <td>₹{item.balance}</td>
        <td>{badgeView}</td>
        <td>
          <Switch onChange={onChange} />
        </td>
        <td>
          <button
            className="btn btn-success"
            onClick={() =>
              router.push(
                `/manage-customer/corporate-customer/manage-users/${item?.custoemer_id}`
              )
            }
          >
            Manage
          </button>
        </td>
        <td>
          <div className="edit_view_btn">
            <IoEyeOutline onClick={() => handleViewCustomer(item)} />
            {/* <FaEdit /> */}
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <div className="ps-form__left ps-form--filter">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search by Customer Name"
                      style={{ height: "50px" }}
                      value={searchName}
                      onChange={handleSearchNameChange}
                    />
                  </div>
                </div>
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
                <th>Customer Type</th>
                <th>Date of Registration</th>
                <th>Last Login Date</th>
                <th>Total Purchase</th>
                <th>Status</th>
                <th>Status</th>
                <th>Manage user</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                tableItemsView
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    <b>No Customer Found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>
            Show {filteredCustomers.length} of {customers.length} items.
          </p>
          <Pagination />
        </div>
      </div>

      {/* FOR VIEW CUSTOMER DETAILS MODAL */}
      <Modal
        title={
          <>
            <span>View customer - 7</span>
            <hr />
          </>
        }
        maskClosable={false}
        loading={viewLoading}
        footer={null}
        width={1000}
        className="modal-blur-background"
        open={viewCustomer}
        onCancel={() => setViewCustomer(false)}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Customer Name</label>
                <input className="form-control" value="Test" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Customer Type</label>
                <input className="form-control" value="gst company" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  className="form-control"
                  value="CODINFOX LLP."
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>GST Number</label>
                <input
                  className="form-control"
                  value="22AAAAA0000A1Z5"
                  disabled
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Mobile No.</label>
                <input className="form-control" value="9737392505" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Email ID</label>
                <input
                  className="form-control"
                  value="test@gmail.com"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Date of Registration</label>
                <input className="form-control" value="12-04-2024" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Last Login Date</label>
                <input className="form-control" value="12-04-2024" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Total Purchase</label>
                <input className="form-control" value="23,087" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Designation</label>
                <input className="form-control" value="Software" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Register as</label>
                <input className="form-control" value="Sales" disabled />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Status</label>
                <input className="form-control" value="Active" disabled />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CorporateUser;
