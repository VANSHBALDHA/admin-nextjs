import { Button, Modal, Select } from 'antd';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import combinedData from "~/data/categoryData"
import displayData from "~/data/displayData"
import "../manage-certificate/styles.css"
import { GoPencil } from 'react-icons/go';

const ManageCategories = () => {
    const [newCategoryModel, setNewCategoryModel] = useState(false);

    const [editCategoryModel, setEditCategoryModel] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ categoryName: '', status: '', name: "" });

    const handleEditCategory = (item) => {
        setEditCategoryModel(true);
        setLoading(true);
        setCurrentItem(item);
        setFormData({ categoryName: item?.categoryName, status: item?.status, name: item?.name });

        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const handleUpdateCategory = () => {
        const updatedData = combinedData.map(item =>
            item.id === currentItem.id ? { ...item, categoryName: formData?.categoryName, status: formData.status, name: formData?.name } : item
        );
        setEditCategoryModel(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prevState => ({ ...prevState, status: value }));
    };

    const tableItems = combinedData.map((item, index) => {
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
                        <strong>{item?.categoryName}</strong>
                    </a>
                </td>
                <td>
                    <span>{item?.name}</span>
                </td>
                <td>{statusView}</td>
                <td style={{ cursor: "pointer", fontSize: "23px" }} onClick={() => handleEditCategory(item)}>
                    <GoPencil />
                </td>
            </tr>
        );
    });

    const handleAddCategory = () => {
        setNewCategoryModel(true);
    };

    const handleCloseCategory = () => {
        setNewCategoryModel(false);
    };


    return (
        <>
            <div className="ps-section__content">
                <div className="ps-section__actions">
                    <button
                        onClick={handleAddCategory}
                        className="ps-btn success" >
                        <i className="icon icon-plus mr-2" />
                        Add Category
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table ps-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Categories Name</th>
                                <th>Display Name</th>
                                <th>Status</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>{tableItems}</tbody>
                    </table>
                </div>
            </div>


            {/* FOR ADD NEW CATEGORIES MODAL */}

            <Modal
                title={<b>Add Category</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleCloseCategory}>
                        Save
                    </Button>
                }
                open={newCategoryModel}
                onCancel={() => setNewCategoryModel(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Category Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Add category name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Select Display Name<sup>*</sup>
                        </label>
                        <Select
                            className='w-100'
                            style={{ height: "50px" }}
                            placeholder="Select display name"
                            options={displayData?.map(data => ({
                                value: data?.id,
                                label: data?.name
                            }))}
                        />
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



            {/* FOR EDIT CATEGORIES MODAL */}
            <Modal
                title={<b>Edit Category Details</b>}
                maskClosable={false}
                footer={
                    <Button type="primary" onClick={handleUpdateCategory}>
                        Save
                    </Button>
                }
                loading={loading}
                open={editCategoryModel}
                onCancel={() => setEditCategoryModel(false)}
            >
                <div className="ps-block__content">
                    <div className="form-group">
                        <label>
                            Category Name<sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleInputChange}
                            placeholder="Edit category name"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Select Display Name<sup>*</sup>
                        </label>
                        <Select
                            className='w-100'
                            style={{ height: "50px" }}
                            placeholder="Select display name"
                            value={formData.name}
                            options={displayData?.map(data => ({
                                value: data?.id,
                                label: data?.name
                            }))}
                        />
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

export default ManageCategories
