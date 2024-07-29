import { Button, Modal, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FaEdit } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsUpload } from "react-icons/bs";
import certificateData from "~/data/certificateData"
import Image from 'next/image';
import "./styles.css"
import { GoPencil } from 'react-icons/go';

const ManageCertificates = () => {
    const [addCertificate, setAddCertificate] = useState(false);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', image: "", status: '' });

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

    const editDisplayName = (item) => {
        setOpen(true);
        setLoading(true);
        setCurrentItem(item);
        setFormData({ name: item.name, image: item.image, status: item.status });

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const closeDisplayName = () => {
        const updatedData = certificateData.map(item =>
            item.id === currentItem.id ? { ...item, name: formData.name, image: formData.image, status: formData.status } : item
        );
        setOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prevState => ({ ...prevState, status: value }));
    };

    const tableItems = certificateData.map((item, index) => {
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
                <td>
                    <img src={item?.image} alt="" style={{ width: "100px" }} />
                </td>
                <td>{statusView}</td>
                <td style={{ cursor: "pointer", fontSize: "23px" }} onClick={() => editDisplayName(item)}>
                    <GoPencil />
                </td>
            </tr>
        );
    });

    const AddCertificate = () => {
        setAddCertificate(true);
    };

    const CloseCertificate = () => {
        setAddCertificate(false);
    };


    return (
        <>
            <div className="ps-section__content">
                <div className="ps-section__actions">
                    <button
                        onClick={AddCertificate}
                        className="ps-btn success" >
                        <i className="icon icon-plus mr-2" />
                        Add Certificate
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table ps-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Certificate Name</th>
                                <th>Certificate Logo</th>
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
                title={<b>Add Certificate</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={CloseCertificate}>
                        Save
                    </Button>
                }
                open={addCertificate}
                onCancel={() => setAddCertificate(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Certificate Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Add certificate name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Certificate Logo<sup>*</sup>
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
                title={<b>Edit Certificate</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={closeDisplayName}>
                        Save
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Certificate Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Edit certificate name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Certificate Logo<sup>*</sup>
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

export default ManageCertificates
