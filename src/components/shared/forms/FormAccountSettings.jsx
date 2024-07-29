"use client";
import React, { useState } from "react";
import { Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const FormAccountSettings = () => {
  const [contact, setContact] = useState();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      projects: Yup.string().required("Please Enter Your Project"),
    }),

    onSubmit: (values) => {
      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        designation: values["designation"],
        email: values["email"],
        projects: values["projects"],
      };
      console.log("new user", values);
      validation.resetForm();
      toggle();
    },
  });

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <Label className="form-label">Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Insert Name"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name || ""}
                invalid={
                  validation.touched.name && validation.errors.name
                    ? true
                    : false
                }
              />
              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <Label className="form-label">Designation</Label>
              <Input
                name="designation"
                label="Designation"
                placeholder="Insert Designation"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.designation || ""}
                invalid={
                  validation.touched.designation &&
                  validation.errors.designation
                    ? true
                    : false
                }
              />
              {validation.touched.designation &&
              validation.errors.designation ? (
                <FormFeedback type="invalid">
                  {validation.errors.designation}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <Label className="form-label">Email</Label>
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Insert Email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={
                  validation.touched.email && validation.errors.email
                    ? true
                    : false
                }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">
                  {validation.errors.email}
                </FormFeedback>
              ) : null}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <Label className="form-label">Projects</Label>
              <Input
                name="projects"
                label="Projects"
                type="text"
                placeholder="Insert Projects"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.projects || ""}
                invalid={
                  validation.touched.projects && validation.errors.projects
                    ? true
                    : false
                }
              />
              {validation.touched.projects && validation.errors.projects ? (
                <FormFeedback type="invalid">
                  {validation.errors.projects}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </div>
        <div className="ps-form__submit text-center">
          <button className="ps-btn success" type="submit">
            save
          </button>
        </div>
      </Form>
    </>
  );
};

export default FormAccountSettings;
