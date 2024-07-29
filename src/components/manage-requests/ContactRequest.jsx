import React, { useState } from "react";
import Pagination from "../elements/basic/Pagination";
import { Modal } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import "../master-management/manage-certificate/styles.css";

const ContactRequest = () => {
  const ContactData = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john.doe@example.com",
      date: "2024-07-10",
      subject: "Inquiry about new product",
      message: "Can you provide more details about the new laptop?",
      action: "View",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2024-07-11",
      subject: "Order status update",
      message: "When will my order be shipped?",
      action: "Reply",
    },
    {
      id: 3,
      customerName: "Michael Johnson",
      email: "michael.johnson@example.com",
      date: "2024-07-12",
      subject: "Issue with recent purchase",
      message: "The tablet I received is not working.",
      action: "Resolve",
    },
    {
      id: 4,
      customerName: "Emily Brown",
      email: "emily.brown@example.com",
      date: "2024-07-13",
      subject: "Return request",
      message: "I would like to return the headphones.",
      action: "Process",
    },
    {
      id: 5,
      customerName: "Chris Lee",
      email: "chris.lee@example.com",
      date: "2024-07-14",
      subject: "Feedback on smartwatch",
      message: "The smartwatch is amazing! Thank you.",
      action: "Acknowledge",
    },
  ];

  const [viewRequest, setViewRequest] = useState(false);
  const [viewLoading, setViewLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleViewProduct = (item) => {
    setSelectedUser(item);
    setViewRequest(true);
    setViewLoading(true);

    setTimeout(() => {
      setViewLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchDate("");
  };

  const filteredItems = ContactData.filter((item) => {
    const searchTermMatch =
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const searchDateMatch = item.date.includes(searchDate);

    return searchTermMatch && searchDateMatch;
  });

  const tableItems = filteredItems.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>
          <a href="#">
            <strong>{item?.customerName}</strong>
          </a>
        </td>
        <td>{item?.email}</td>
        <td>{item?.date}</td>
        <td className="edit_view_btn" onClick={() => handleViewProduct(item)}>
          <IoEyeOutline />
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
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="🔍 Search by Name or Email"
                  style={{ height: "50px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="date"
                  placeholder="Search by Date"
                  style={{ height: "50px" }}
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="ps-section__actions">
            <button
              className="ps-btn success"
              onClick={clearFilters}
              style={{ height: "50px", marginLeft: "10px" }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                tableItems
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <b>No Inquiry Found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>
            Show {filteredItems.length} of {ContactData.length} items.
          </p>
          <Pagination />
        </div>
      </div>

      {/* MODEL FOR CONTACT DETAILS FORM */}
      {selectedUser && (
        <Modal
          title={
            <>
              <h4>Details - {selectedUser.id}</h4>
              <hr />
            </>
          }
          maskClosable={false}
          footer={null}
          width={800}
          open={viewRequest}
          onCancel={() => setViewRequest(false)}
        >
          <div className="ps-block__content">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Customer ID</label>
                  <input
                    className="form-control"
                    value={selectedUser.id}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    className="form-control"
                    value={selectedUser.customerName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Customer Email</label>
                  <input
                    className="form-control"
                    value={selectedUser.email}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    className="form-control"
                    value={selectedUser.subject}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Date of Request</label>
                  <input
                    className="form-control"
                    value={selectedUser.date}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={selectedUser.message}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ContactRequest;
