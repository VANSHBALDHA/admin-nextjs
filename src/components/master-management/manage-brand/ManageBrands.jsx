import { Button, Modal, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FaEdit } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import brandData from "~/data/brandData"
import Image from 'next/image';
import "../manage-certificate/styles.css"
import { GoPencil } from 'react-icons/go';

const ManageBrands = () => {
    const [openBrandModel, setOpenBrandModel] = useState(false);

    const [editbrandModel, setEditBrandModel] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ brandName: '', brandFullName: '', status: '' });

    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedImage = localStorage.getItem('uploadedImage');
        if (storedImage) {
            setFiles([{ preview: storedImage }]);
        }
    }, []);


    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length > 0) {
                setErrorMessage("Only *.jpeg and *.png images will be accepted.");
                return;
            }
            if (acceptedFiles?.length) {
                if (files.length + acceptedFiles.length > 1) {
                    setErrorMessage("You can only upload a maximum of 1 image.");
                    return;
                }
                const file = acceptedFiles[0];
                if (file.size > 5 * 1024 * 1024) {
                    setErrorMessage("File size must be less than 5MB.");
                    return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(acceptedFiles[0]);
                reader.onloadend = () => {
                    const base64String = reader.result;
                    localStorage.setItem('uploadedImage', base64String);
                    setFiles([{ preview: base64String }]);
                };
                setErrorMessage('');
            }
        },
        [files]
    );


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        },
        maxFiles: 1,
    });

    const removeFile = () => {
        setErrorMessage('');
        setFiles([]);
        localStorage.removeItem('uploadedImage');
    };

    const handleEditCategory = (item) => {
        setEditBrandModel(true);
        setLoading(true);
        setCurrentItem(item);
        setFormData({ brandName: item?.brandName, brandFullName: item?.brandFullName, status: item?.status });

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleUpdateCategory = () => {
        const updatedData = brandData.map(item =>
            item.id === currentItem.id ? { ...item, brandName: formData?.brandName, brandName: item?.brandFullName, status: formData.status } : item
        );
        setEditBrandModel(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prevState => ({ ...prevState, status: value }));
    };

    const tableItems = brandData.map((item, index) => {
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
                        <strong>{item?.brandName}</strong>
                    </a>
                </td>
                <td>
                    <span>{item?.brandFullName}</span>
                </td>
                <td>
                    <img src={item?.brandLogo} alt="" style={{ width: "100px" }} />
                </td>
                <td>{statusView}</td>
                <td style={{ cursor: "pointer", fontSize: "23px" }} onClick={() => handleEditCategory(item)}>
                    <GoPencil />
                </td>
            </tr>
        );
    });

    const handleAddBrand = () => {
        setOpenBrandModel(true);
    };

    const handleCloseBrand = () => {
        setOpenBrandModel(false);
    };


    return (
        <>
            <div className="ps-section__content">
                <div className="ps-section__actions">
                    <button
                        onClick={handleAddBrand}
                        className="ps-btn success" >
                        <i className="icon icon-plus mr-2" />
                        Add Brand
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table ps-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Manufacturer Short Name</th>
                                <th>Manufacturer Full Name</th>
                                <th>Brand Logo</th>
                                <th>Status</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>{tableItems}</tbody>
                    </table>
                </div>
            </div>


            {/* FOR ADD NEW CERTIFICATE MODAL */}

            <Modal
                title={<b>Add Brand</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleCloseBrand}>
                        Save
                    </Button>
                }
                open={openBrandModel}
                onCancel={() => setOpenBrandModel(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Brand Short Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Add brand name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Brand Full Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Add brand full name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Brand Logo<sup>*</sup>
                        </label>
                        <div>
                            <div {...getRootProps()} className="upload_box">
                                <input {...getInputProps()} />
                                <BsUpload className='mb-3' />
                                <p>Drag & drop some files here, or click to select files</p>
                                <em>(Only *.jpeg and *.png image will be accepted)</em>
                            </div>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <div className="text-center d-flex justify-content-center">
                                {files?.map((file) => (
                                    <div key={file?.name} className="position-relative uploaded_img_box">
                                        <Image
                                            src={file?.preview}
                                            alt={file?.name}
                                            width={100}
                                            height={100}
                                            className='img_preview'
                                            onLoad={() => URL.revokeObjectURL(file?.preview)}
                                        />
                                        <button type="button" onClick={removeFile} className="img_cancle">
                                            <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='form-lable'>
                            Status<sup>*</sup>
                        </label>
                        <Select
                            className='w-100'
                            style={{ height: "50px" }}
                            placeholder="Select status"
                            options={[
                                {
                                    value: 'active',
                                    label: 'Active',
                                },
                                {
                                    value: 'inactive',
                                    label: 'InActive',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Modal>



            {/* FOR EDIT CERTIFICATE DETAILS MODAL */}
            <Modal
                title={<b>Edit Brand Details</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleUpdateCategory}>
                        Save
                    </Button>
                }
                loading={loading}
                open={editbrandModel}
                onCancel={() => setEditBrandModel(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Brand Short Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleInputChange}
                            placeholder="Edit brand short name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Brand Full Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="brandFullName"
                            value={formData.brandFullName}
                            onChange={handleInputChange}
                            placeholder="Edit brand full name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Brand Logo<sup>*</sup>
                        </label>
                        <div>
                            <div {...getRootProps()} className="upload_box">
                                <input {...getInputProps()} />
                                <BsUpload className='mb-3' />
                                <p>Drag & drop some files here, or click to select files</p>
                                <em>(Only *.jpeg and *.png image will be accepted)</em>
                            </div>
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <div className="text-center d-flex justify-content-center">
                                {files?.map((file) => (
                                    <div key={file?.name} className="position-relative uploaded_img_box">
                                        <Image
                                            src={file?.preview}
                                            alt={file?.name}
                                            width={100}
                                            height={100}
                                            className='img_preview'
                                            onLoad={() => URL.revokeObjectURL(file?.preview)}
                                        />
                                        <button type="button" onClick={removeFile} className="img_cancle">
                                            <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='form-lable'>
                            Status<sup>*</sup>
                        </label>
                        <Select
                            className='w-100'
                            style={{ height: "50px" }}
                            placeholder="Select status"
                            value={formData.status}
                            onChange={handleSelectChange}
                            options={[
                                {
                                    value: 'active',
                                    label: 'Active',
                                },
                                {
                                    value: 'inactive',
                                    label: 'InActive',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default ManageBrands
