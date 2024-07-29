"use client";

import { Button, Modal, Select, Switch } from "antd";
import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import mobile_features from "~/data/FeaturesData";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Features = () => {
  const router = useRouter();
  const [newFeatureModel, setNewFeatureModel] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "" });

  const handleAddFeature = () => {
    setNewFeatureModel(true);
  };

  const handleCloseFeature = () => {
    setNewFeatureModel(false);
  };

  const editFutureName = (item) => {
    setOpen(true);
    setLoading(true);
    setCurrentItem(item);
    setFormData({ name: item.feature, status: item.status });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const closeDisplayName = () => {
    const updatedData = mobile_features.map((item) =>
      item.id === currentItem.id
        ? { ...item, feature: formData.name, status: formData.status }
        : item
    );
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const tableItems = mobile_features.map((item) => {
    let statusView;
    if (item.status === "active") {
      statusView = <span className="ps-badge success">Active</span>;
    } else {
      statusView = <span className="ps-badge gray">Inactive</span>;
    }
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <strong>{item.feature}</strong>
        </td>
        <td>{statusView}</td>
        <td>
          <Switch checked={item.status === "active"} onChange={onChange} />
        </td>
        <td
          style={{ cursor: "pointer", fontSize: "23px" }}
          onClick={() => editFutureName(item)}
        >
          <GoPencil />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__actions d-flex justify-content-between">
          <button
            onClick={() =>
              router.push("/master-managements/manage-sub-sub-categories")
            }
            className="ps-btn success"
          >
            <FaArrowLeftLong className="me-2" />
            Back
          </button>
          <button onClick={handleAddFeature} className="ps-btn success">
            <i className="icon icon-plus mr-2" />
            Add Feature
          </button>
        </div>
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Feature Name</th>
                <th>Status</th>
                <th>Status Change</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableItems}</tbody>
          </table>
        </div>
      </div>

      {/* FOR ADD NEW FEATURE MODEL */}

      <Modal
        title={<b>Add feature</b>}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={handleCloseFeature}>
            Save
          </Button>
        }
        open={newFeatureModel}
        onCancel={() => setNewFeatureModel(false)}
      >
        <div className="ps-block__content">
          <div className="form-group">
            <label>
              Feature Name<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Add feature name"
            />
          </div>
          {/* <div className="form-group">
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
          </div> */}
        </div>
      </Modal>

      {/* FOR EDIT FEATURE NAME MODEL */}
      <Modal
        title={
          <>
            Edit Feature Name - {formData?.name}
            <hr />
          </>
        }
        maskClosable={false}
        footer={
          <Button type="primary" onClick={closeDisplayName}>
            Update
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div className="ps-block__content">
          <div className="form-group">
            <label>
              Feature Name<sup>*</sup>
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Edit feature name"
            />
          </div>
          {/* <div className="form-group">
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
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default Features;
