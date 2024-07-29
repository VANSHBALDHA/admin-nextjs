import { Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "~/components/elements/basic/Pagination";

const SalesReport = () => {
  const products = [
    {
      id: 1,
      customerName: "John Doe",
      customerType: "Individual",
      orderNo: "ORD001",
      totalAmount: 150.0,
      receivedAmount: 100.0,
      pendingAmount: 50.0,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerType: "Corporate",
      orderNo: "ORD002",
      totalAmount: 300.0,
      receivedAmount: 200.0,
      pendingAmount: 100.0,
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      customerType: "Individual",
      orderNo: "ORD003",
      totalAmount: 250.0,
      receivedAmount: 250.0,
      pendingAmount: 0.0,
    },
    {
      id: 4,
      customerName: "Bob Brown",
      customerType: "Corporate",
      orderNo: "ORD004",
      totalAmount: 400.0,
      receivedAmount: 300.0,
      pendingAmount: 100.0,
    },
    {
      id: 5,
      customerName: "Charlie Davis",
      customerType: "Individual",
      orderNo: "ORD005",
      totalAmount: 500.0,
      receivedAmount: 400.0,
      pendingAmount: 100.0,
    },
  ];

  const [searchInput, setSearchInput] = useState("");
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCustomerTypeChange = (value) => {
    setSelectedCustomerType(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchInput = product.orderNo
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCustomerType = selectedCustomerType
      ? product.customerType.toLowerCase() ===
        selectedCustomerType.toLowerCase()
      : true;

    return matchesSearchInput && matchesCustomerType;
  });

  const tableItems = filteredProducts.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        <Link href={`/manage-inventory/sales/invoice/${item?.orderNo}`}>
          <strong>{item.customerName}</strong>
        </Link>
      </td>
      <td>{item.customerType}</td>
      <td>
        <Link href={`/manage-inventory/sales/orders/${item?.orderNo}`}>
          <strong>{item.orderNo}</strong>
        </Link>
      </td>
      <td className="text-muted">₹{item.totalAmount}</td>
      <td className="text-success">₹{item.receivedAmount}</td>
      <td className="text-start text-danger">₹{item.pendingAmount}</td>
    </tr>
  ));

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <div className="ps-form__left ps-form--filter">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search by Order No."
                  style={{ height: "50px" }}
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="form-group">
                <Select
                  className="w-100"
                  style={{ height: "50px" }}
                  allowClear={true}
                  placeholder="Select by customer type"
                  options={[
                    { value: "individual", label: "Individual" },
                    { value: "corporate", label: "Corporate" },
                  ]}
                  onChange={handleCustomerTypeChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table ps-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Type</th>
                <th>Order No.</th>
                <th>Total Amount</th>
                <th>Received Amount</th>
                <th>Pending Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                tableItems
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    <b>No products found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="ps-section__footer">
          <p>
            Show {filteredProducts.length} of {products.length} items.
          </p>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default SalesReport;
