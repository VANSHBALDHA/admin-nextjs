import { Button, DatePicker, Modal, Select } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import inventoryItems from "~/data/inventoryData";
import { BiTransferAlt } from "react-icons/bi";
import Pagination from "~/components/elements/basic/Pagination";
import { GoPencil } from "react-icons/go";

const ReservedInventory = () => {
  const [addInventory, setAddInventory] = useState(false);
  const [addStock, setAddStock] = useState(false);
  const [transferStock, setTransferStock] = useState(false);

  const [openInventory, setOpenInventory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const [quantity, setQuantity] = useState("");

  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    saleReturn: "",
    status: "",
  });

  const handleAddInventory = () => {
    setAddInventory(true);
  };

  const handleCloseInventory = () => {
    setAddInventory(true);
  };

  const handleAddStock = () => {
    setAddStock(true);
  };

  const handleCloseStock = () => {
    setAddStock(false);
  };

  const handleTransferStock = () => {
    setTransferStock(true);
  };

  const handleCloseTransferStock = () => {
    setTransferStock(false);
  };

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

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value > 0 && !isNaN(value))) {
      setQuantity(value);
    }
  };

  const tableItems = inventoryItems.map((item, index) => {
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
        <td>
          <button
            className="btn btn-success"
            style={{ fontSize: "12px" }}
            onClick={handleTransferStock}
          >
            <BiTransferAlt style={{ fontSize: "16px" }} /> Transfer Quantity
          </button>
        </td>
        <td>
          <button
            className="btn btn-success"
            style={{ fontSize: "12px" }}
            onClick={handleAddStock}
          >
            <i className="icon icon-plus" /> Add Stock
          </button>
        </td>
        <td
          style={{ cursor: "pointer", fontSize: "23px" }}
          onClick={() => handleEditInventory(item)}
        >
          <GoPencil />
        </td>
      </tr>
    );
  });

  const onDateChange = (date) => {
    // console.log("Selected date (moment object):", date?.format("DD-MM-YYYY"));
    setDate(date?.format("DD-MM-YYYY"));
  };

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__actions">
          <button className="ps-btn success" onClick={handleAddInventory}>
            <i className="icon icon-plus mr-2" />
            Add Inventory
          </button>
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
                <th>Transfer to display</th>
                <th>Add Stock</th>
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
      </div>

      {/* FOR ADD NEW INVENTORY MODEL */}
      <Modal
        title={<b>Add Inventory</b>}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleCloseInventory}>
            Save
          </Button>
        }
        open={addInventory}
        onCancel={() => setAddInventory(false)}
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

      {/* FOR EDIT INVENTORY MODEL */}
      <Modal
        title={
          <>
            <b>Edit</b> - {formData?.productName}
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

      {/* FOR Add STOCK MODEL */}
      <Modal
        title={
          <>
            <b>Add Stock</b>
            <hr />
          </>
        }
        maskClosable={false}
        width={800}
        footer={
          <Button type="primary" onClick={handleCloseStock}>
            Save
          </Button>
        }
        open={addStock}
        onCancel={() => setAddStock(false)}
      >
        <div className="ps-block__content">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="productName"
                  placeholder="Enter product name"
                  value="Smartphone"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Reserved Product Quantity</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value="30"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Display Available Quantity</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  value="30"
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Add Quantity<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Add product quantity"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Purchase Price<sup>*</sup>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Add product purchase price"
                />
              </div>
            </div>
            <div className="col-md-4">
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
          </div>
        </div>
      </Modal>

      {/* FOR Transfer Quantity MODEL */}
      <Modal
        title={
          <>
            <b>Transfer Quantity</b>
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleCloseTransferStock}>
            Save
          </Button>
        }
        open={transferStock}
        onCancel={() => setTransferStock(false)}
      >
        <div className="ps-block__content">
          <div className="form-group">
            <label>Display Quantity</label>
            <input className="form-control" type="number" value="5" disabled />
          </div>
          <div className="form-group">
            <label>Available Quantity</label>
            <input className="form-control" type="number" value="20" disabled />
          </div>
          <div className="form-group">
            <label>Transfer Quantity</label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter transfer quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <span style={{ color: "#737373" }}>
              Note : Please do not add more quantity than available quantity.
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReservedInventory;
