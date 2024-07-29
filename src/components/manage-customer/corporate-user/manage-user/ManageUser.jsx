"use client";

import { Badge, Button, Modal, Select } from "antd";
import React, { useState } from "react";
import "../../..//master-management/manage-certificate/styles.css";
import { IoEyeOutline } from "react-icons/io5";

const { Option } = Select;

const ManageUser = () => {
  const customers = [
    {
      name: "Anisa Forster",
      date: "15-06-2022",
      balance: "211.00",
      orders: "10",
      status: "true",
      customer_type: "gst company",
      customer_id: 1,
      last_login_date: "10-06-2024",
      register_as: "sales",
    },
  ];

  const [viewCustomer, setViewCustomer] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [viewCustomerData, setViewCustomerData] = useState("");

  const handleViewCustomer = (item) => {
    setViewCustomerData(item);
    setViewCustomer(true);
    setViewLoading(true);

    setTimeout(() => {
      setViewLoading(false);
    }, 500);
  };

  const handleChangeRegisterAs = (value) => {
    console.log("Selected:", value);
    // Update the customer register_as logic here if needed
  };

  const handleSave = () => {
    setViewCustomer(false);
  };

  const tableItemsView = customers.map((item, index) => {
    let badgeView;

    if (item.register_as === "sales") {
      badgeView = <Badge status="success" text={item.register_as} />;
    } else if (item.register_as === "admin") {
      badgeView = <Badge status="processing" text={item.register_as} />;
    } else {
      badgeView = <Badge status="default" text={item.register_as} />;
    }

    return (
      <tr key={index} className="text-center">
        <td>{index + 1}</td>
        <td>
          <strong>{item.name}</strong>
        </td>
        <td>{item.customer_type}</td>
        <td>{badgeView}</td>
        <td>
          <div className="edit_view_btn">
            <IoEyeOutline onClick={() => handleViewCustomer(item)} />
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
                <th>Customer Type</th>
                <th>Register As</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableItemsView}</tbody>
          </table>
        </div>
      </div>

      {/* FOR CHANGE CUSTOMER REGISTER TYPE MODAL */}
      <Modal
        title={
          <>
            <h4>Edit Role - {viewCustomerData.name}</h4>
            <hr />
          </>
        }
        maskClosable={false}
        loading={viewLoading}
        footer={
          <>
            <hr />
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        }
        width={700}
        className="modal-blur-background"
        open={viewCustomer}
        onCancel={() => setViewCustomer(false)}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  className="form-control"
                  value={viewCustomerData.name}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Customer Type</label>
                <input
                  className="form-control"
                  value={viewCustomerData.customer_type}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Register as</label>
                <Select
                  defaultValue={viewCustomerData.register_as}
                  onChange={handleChangeRegisterAs}
                  style={{ width: "100%", height: "50px" }}
                >
                  <Option value="sales">Sales</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="technician">Technician</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageUser;
