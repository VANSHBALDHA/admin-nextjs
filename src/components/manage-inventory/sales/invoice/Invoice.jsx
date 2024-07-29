"use client";

import React from "react";
import { Table } from "antd";
import Link from "next/link";

const Invoice = () => {
  const tableColumn = [
    {
      title: "Id",
      dataIndex: "invoiceId",
      rowKey: "invoiceId",
      key: "invoiceId",
      width: "120px",
      render: (text, record) => (
        <Link
          href={`/manage-inventory/sales/invoice/${record.invoiceId}/invoice-detail/${record.invoiceId}`}
          legacyBehavior
        >
          {record.invoiceId}
        </Link>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      rowKey: "title",
      key: "title",
    },
    {
      title: "Date",
      rowKey: "dateCreate",
      dataIndex: "dateCreate",
      key: "dateCreate",
      width: "120px",
    },
    {
      title: "Amount",
      rowKey: "amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <span className="text-right">${record.amount}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      rowKey: "status",
      width: "150px",
      render: (text, record) => (
        <span className="text-right">{record.amount}</span>
      ),
    },
  ];
  const tableData = [
    {
      id: "1",
      invoiceId: "500884010",
      title: "Marshall Kilburn Portable Wireless Speaker",
      dateCreate: "20-1-2020",
      amount: "42.99",
      status: "Successful delivery",
    },
    {
      id: "2",
      invoiceId: "593347935",
      title: "Herschel Leather Duffle Bag In Brown Color",
      dateCreate: "20-1-2020",
      amount: "199.99",
      status: "Cancel",
    },
  ];

  return (
    <>
      <Table
        columns={tableColumn}
        dataSource={tableData}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default Invoice;
