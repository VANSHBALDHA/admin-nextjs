import React from "react";
import Pagination from "../elements/basic/Pagination";
import { GoPencil } from "react-icons/go";
import { useRouter } from "next/navigation";
import "../master-management/manage-certificate/styles.css";

const IndividualCart = () => {
  const router = useRouter();
  const individualCustomerData = [
    {
      id: 1,
      cartnumber: "CART-001",
      customername: "John Doe",
      createdDate: "2024-07-08",
      updatedDate: "2025-07-20",
      status: "Expired",
      cartItems: [
        {
          id: 1,
          productCode: "P001",
          productName: "Product A",
          discountPrice: 50,
          quantity: 2,
        },
        {
          id: 2,
          productCode: "P002",
          productName: "Product B",
          discountPrice: 30,
          quantity: 1,
        },
      ],
    },
    {
      id: 2,
      cartnumber: "CART-002",
      customername: "Jane Smith",
      createdDate: "2024-07-08",
      updatedDate: "2023-07-20",
      status: "Order Confirmed",
      cartItems: [
        {
          id: 3,
          productCode: "P003",
          productName: "Product C",
          discountPrice: 40,
          quantity: 3,
        },
      ],
    },
  ];

  const handleViewCart = (item) => {
    router.push(`/manage-request/cart/cart-list/${item?.cartnumber}`);
  };

  const tableItems = individualCustomerData.map((item, index) => {
    let statusView;
    if (item.status === "Expired") {
      statusView = <span className="ps-badge success">{item.status}</span>;
    } else if (item?.status === "Updated") {
      statusView = <span className="ps-badge gray">{item.status}</span>;
    } else {
      statusView = <span className="ps-badge gray">{item.status}</span>;
    }

    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>
          <a href="#">
            <strong>{item?.cartnumber}</strong>
          </a>
        </td>
        <td>{item?.customername}</td>
        <td>{item?.createdDate}</td>
        <td>{item?.updatedDate}</td>
        <td>{statusView}</td>
        <td onClick={() => handleViewCart(item)} className="edit_view_btn">
          <GoPencil />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="table-responsive">
        <table className="table ps-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cart Number</th>
              <th>Customer Name</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {individualCustomerData.length > 0 ? (
              tableItems
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  <b>No Product Found</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="ps-section__footer">
        <p>Show 10 of 10 items.</p>
        <Pagination />
      </div>
    </>
  );
};

export default IndividualCart;
