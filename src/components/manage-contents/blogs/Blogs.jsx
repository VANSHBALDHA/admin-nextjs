import { Button, DatePicker, Modal, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FaEdit } from 'react-icons/fa';
import BlogData from '~/data/BlogsData';
import dynamic from 'next/dynamic'
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { BsUpload } from 'react-icons/bs';
import "../../master-management/manage-certificate/styles.css"
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';

const Blogs = () => {

    const categories = [
        { id: 1, name: "Life Style" },
        { id: 2, name: "Technology" },
        { id: 3, name: "Entertainment" },
        { id: 4, name: "Business" },
        { id: 5, name: "Others" },
        { id: 6, name: "Fashion" }
    ];

    const [addBlog, setAddBLog] = useState(false);

    const [loading, setLoading] = useState(true);
    const [editBlog, setEditBLog] = useState(false);
    const [currentBlogItem, setCurrentBlogItem] = useState(null);
    const [formData, setFormData] = useState({ title: '', image: "", status: '' });


    const [blogContent, setBlogContent] = useState("")
    const [date, setDate] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddBlog = () => {
        setAddBLog(true);
    };

    const handleCloseBlog = () => {
        setAddBLog(false);
    };

    const handleEditBlog = (item) => {
        setEditBLog(true);
        setLoading(true);
        setCurrentBlogItem(item);
        setFormData({ title: item.title, image: item.image, status: item.status });

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleCloseEditBlog = () => {
        // const updatedData = certificateData.map(item =>
        //     item.id === currentItem.id ? { ...item, name: formData.name, image: formData.image, status: formData.status } : item
        // );
        setEditBLog(false);
    }


    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedImage = localStorage.getItem('blogImage');
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
                    localStorage.setItem('blogImage', base64String);
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
        localStorage.removeItem('blogImage');
    };


    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            [{ align: [] }],
            [{ color: [] }],
            ["code-block"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "video",
        "font",
        "size",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "code-block",
    ];


    const onDateChange = (date) => {
        // console.log("Selected date (moment object):", date?.format("DD-MM-YYYY"));
        setDate(date?.format("DD-MM-YYYY"));
    };

    const tableItems = BlogData.map((item, index) => {
        let statusView;
        if (item.active === true) {
            statusView = <span className="ps-badge success">Active</span>;
        } else {
            statusView = <span className="ps-badge gray">InActive</span>;
        }
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <a href="#">
                        <strong>{item.title}</strong>
                    </a>
                </td>
                <td>{item?.slug}</td>
                <td>{item?.category}</td>
                <td><img src={item?.image} alt="" style={{ width: "100px" }} /></td>
                <td>{statusView}</td>
                <td style={{ cursor: "pointer", fontSize: "23px" }} onClick={() => handleEditBlog(item)}>
                    <GoPencil />
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="ps-section__content">
                <div className="ps-section__actions">
                    <button
                        className="ps-btn success" onClick={handleAddBlog}>
                        <i className="icon icon-plus mr-2" />
                        Add Blog
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table ps-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Blog Title</th>
                                <th>Slug</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>{tableItems}</tbody>
                    </table>
                </div>
            </div>


            {/* FOR ADD NEW BLOG FORM */}
            <Modal
                title={<b>Add Blog</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleCloseBlog}>
                        Save
                    </Button>
                }
                open={addBlog}
                onCancel={() => setAddBLog(false)}
                width={1000}
            >
                <div className="ps-block__content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>
                                    Blog Title<sup>*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Enter blog title"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>
                                    Slug<sup>*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Enter slug"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className='form-lable'>
                                    Select Category<sup>*</sup>
                                </label>
                                <Select
                                    className='w-100'
                                    style={{ height: "50px" }}
                                    placeholder="Select category"
                                    options={categories?.map((data => ({
                                        label: data?.name,
                                        value: data?.id
                                    })))}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className='form-lable'>
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
                        <div className="col-md-4">
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    Blog Image<sup>*</sup>
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
                        </div>
                        <div className="col-md-6">
                            <div className="form-group" style={{ height: "300px" }}>
                                <label>
                                    Discription<sup>*</sup>
                                </label>
                                <QuillEditor
                                    value={blogContent}
                                    theme="snow"
                                    // onChange={handleShortContentChange}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    style={{ height: "200px" }}
                                    placeholder="Enter your content...."
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >

            {/* FOR EDIT BLOG FORM */}
            <Modal
                title={<b>Edit Blog</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleCloseEditBlog}>
                        Save
                    </Button>
                }
                open={editBlog}
                loading={loading}
                onCancel={() => setEditBLog(false)}
                width={1000}
            >
                <div className="ps-block__content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>
                                    Blog Title<sup>*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    placeholder="Enter blog title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>
                                    Slug<sup>*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="slug"
                                    placeholder="Enter slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className='form-lable'>
                                    Select Category<sup>*</sup>
                                </label>
                                <Select
                                    className='w-100'
                                    style={{ height: "50px" }}
                                    placeholder="Select category"
                                    options={categories?.map((data => ({
                                        label: data?.name,
                                        value: data?.id
                                    })))}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className='form-lable'>
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
                        <div className="col-md-4">
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
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>
                                    Blog Image<sup>*</sup>
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
                        </div>
                        <div className="col-md-6">
                            <div className="form-group" style={{ height: "300px" }}>
                                <label>
                                    Discription<sup>*</sup>
                                </label>
                                <QuillEditor
                                    value={blogContent}
                                    theme="snow"
                                    // onChange={handleShortContentChange}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    style={{ height: "200px" }}
                                    placeholder="Enter your content...."
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default Blogs