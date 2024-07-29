import { Button, Modal, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import Pagination from "~/components/elements/basic/Pagination";
import inventoryItems from "~/data/inventoryData";

const DisplayInventory = () => {
  const [openInventory, setOpenInventory] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    saleReturn: "",
    status: "",
  });

  const [searchText, setSearchText] = useState("");
  const [stockStatus, setStockStatus] = useState(null);

  const handleEditInventory = (item) => {
    setOpenInventory(true);
    setLoading(true);
    setCurrentItem(item);
    setFormData({
      productName: item.productName,
      quantity: item?.quantity,
      price: item?.price,
      saleReturn: item?.salesReturn,
      status: item.status,
    });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleUpdateInventory = () => {
    const updatedData = inventoryItems.map((item) =>
      item.id === currentItem.id
        ? {
            ...item,
            productName: formData.productName,
            quantity: formData?.quantity,
            price: formData?.price,
            salesReturn: formData?.saleReturn,
            status: formData.status,
          }
        : item
    );
    setOpenInventory(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleStockStatusChange = (value) => {
    setStockStatus(value);
  };

  const filteredItems = inventoryItems.filter((item) => {
    const searchTextLower = searchText.toLowerCase();
    const matchesProductName = item.productName
      .toLowerCase()
      .includes(searchTextLower);
    const matchesQuantity = item.quantity.toString().includes(searchTextLower);
    const matchesStockStatus =
      stockStatus === "outOfStock"
        ? item.quantity === 0
        : stockStatus === "lessThan10"
        ? item.quantity < 10
        : true;
    return (matchesProductName || matchesQuantity) && matchesStockStatus;
  });

  const tableItems = filteredItems.map((item, index) => {
    let statusView;
    if (item.status === "active") {
      statusView = <span className="ps-badge success">Active</span>;
    } else {
      statusView = <span className="ps-badge gray">InActive</span>;
    }

    let totalQuantity;
    if (item?.quantity === 0) {
      totalQuantity = <span className="text-danger">Out of stock</span>;
    } else if (item?.quantity < 10) {
      totalQuantity = <span className="text-danger">{item?.quantity}</span>;
    } else {
      totalQuantity = <span>{item?.quantity}</span>;
    }

    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <a href="#">
            <strong>{item.productName}</strong>
          </a>
        </td>
        <td>{totalQuantity}</td>
        <td>₹ {item?.price}</td>
        <td>{statusView}</td>
        <td
          style={{ cursor: "pointer", fontSize: "23px" }}
          onClick={() => handleEditInventory(item)}
        >
          <GoPencil />
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
                  placeholder="Search by Product or quantity"
                  style={{ height: "50px" }}
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
              </div>
              <div className="form-group">
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  allowClear={true}
                  value={stockStatus}
                  onChange={handleStockStatusChange}
                  placeholder="Select quantity status"
                  options={[
                    {
                      value: "outOfStock",
                      label: "Out of Stock",
                    },
                  ]}
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
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Purchase Price (Per item)</th>
                <th>Status</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                tableItems
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    <b>Product not found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>
            Show {filteredItems.length} of {inventoryItems.length} items.
          </p>
          <Pagination />
        </div>
      </div>

      {/* FOR EDIT INVENTORY MODEL */}
      <Modal
        title={
          <>
            <b>Edit - {formData?.productName}</b>
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleUpdateInventory}>
            Save
          </Button>
        }
        loading={loading}
        open={openInventory}
        onCancel={() => setOpenInventory(false)}
      >
        <div className="ps-block__content">
          <div className="form-group">
            <label>
              Product Name<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label>
              Product Quantity<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
            />
          </div>
          <div className="form-group">
            <label>
              Product Purchase Price (Per item)<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
            />
          </div>
          <div className="form-group">
            <label className="form-lable">
              Status<sup>*</sup>
            </label>
            <Select
              className="w-100"
              style={{ height: "50px" }}
              placeholder="Select status"
              value={formData.status}
              onChange={handleSelectChange}
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
      </Modal>
    </>
  );
};

export default DisplayInventory;
