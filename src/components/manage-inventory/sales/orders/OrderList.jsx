"use client";

import React from 'react';
import { Table, Tag } from 'antd';

const OrderList = () => {
  const orders = [
    {
      orderNo: 'ORD001',
      customerName: 'John Doe',
      phoneNumber: '123-456-7890',
      productName: 'Product A',
      price: 100,
      discount: 10,
    },
    {
      orderNo: 'ORD002',
      customerName: 'Jane Smith',
      phoneNumber: '987-654-3210',
      productName: 'Product B',
      price: 150,
      discount: 0,
    },
    {
      orderNo: 'ORD003',
      customerName: 'Alice Johnson',
      phoneNumber: '555-123-4567',
      productName: 'Product C',
      price: 200,
      discount: 25,
    },
    // Add more orders as needed
  ];

  const columns = [
    {
      title: 'Order No.',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>₹{text}</span>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => (
        <Tag color={text > 0 ? 'green' : 'default'}>
          {text > 0 ? `${text}%` : 'None'}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={orders} columns={columns} />
    </>
  );
};

export default OrderList;
