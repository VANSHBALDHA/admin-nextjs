import { Button, Modal, Select, Switch } from "antd";
import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import displayData from "~/data/displayData";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const Displayname = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "" });

  const editDisplayName = (item) => {
    setOpen(true);
    setLoading(true);
    setCurrentItem(item);
    setFormData({ name: item.name, status: item.status });

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const closeDisplayName = () => {
    const updatedData = displayData.map((item) =>
      item.id === currentItem.id
        ? { ...item, name: formData.name, status: formData.status }
        : item
    );
    setOpen(false);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const tableItems = displayData.map((item, index) => {
    let statusView;
    if (item.status === "active") {
      statusView = <span className="ps-badge success">Active</span>;
    } else {
      statusView = <span className="ps-badge gray">InActive</span>;
    }
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <a href="#">
            <strong>{item.name}</strong>
          </a>
        </td>
        {/* <td>{statusView}</td> */}
        <td>
          <Switch onChange={onChange} />
        </td>
        <td
          style={{ cursor: "pointer", fontSize: "23px" }}
          onClick={() => editDisplayName(item)}
        >
          <GoPencil />
        </td>
      </tr>
    );
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: currentItem?.name || "",
      status: currentItem?.status || "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Please Enter Display Name"),
      status: Yup.string().required("Please Select Status"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      setFormData({ name: values.displayName, status: values.status });
      closeDisplayName();
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="ps-section__content">
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Display Name</th>
                <th>Status</th>
                <th style={{ textAlign: "end" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableItems}</tbody>
          </table>
        </div>
      </div>

      <Modal
        title={<b>Edit Display Name</b>}
        maskClosable={false}
        footer={
          <Button type="primary" onClick={() => formik.handleSubmit()}>
            Save
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form onSubmit={formik.handleSubmit}>
          <div className="ps-block__content">
            <div className="form-group">
              <Label>
                Display Name<sup>*</sup>
              </Label>
              <Input
                className="form-control"
                type="text"
                name="displayName"
                value={formik.values.displayName}
                placeholder="Edit display name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.displayName && formik.errors.displayName
                    ? true
                    : false
                }
              />
              {formik.touched.displayName && formik.errors.displayName ? (
                <FormFeedback type="invalid">
                  {formik.errors.displayName}
                </FormFeedback>
              ) : null}
            </div>
            <div className="form-group">
              <Label>
                Status<sup>*</sup>
              </Label>
              <Select
                className="w-100"
                style={{ height: "50px" }}
                placeholder="Select status"
                value={formik.values.status}
                onChange={(value) => formik.setFieldValue("status", value)}
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">InActive</Select.Option>
              </Select>
              {formik.touched.status && formik.errors.status ? (
                <FormFeedback type="invalid">
                  {formik.errors.status}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Displayname;
