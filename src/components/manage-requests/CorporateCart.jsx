import { useRouter } from "next/navigation";
import React from "react";
import { GoPencil } from "react-icons/go";
import Pagination from "../elements/basic/Pagination";
import "../master-management/manage-certificate/styles.css";

const CorporateCart = () => {
  const router = useRouter();

  const corporateCustomerData = [
    {
      id: 1,
      cartnumber: "CART-101",
      customername: "XYZ Corp",
      createdDate: "2024-07-08",
      date: "2024-07-08",
      updatedDate: "2024-05-21",
      status: "Updated",
      cartItems: [
        {
          id: 4,
          productCode: "P004",
          productName: "Product D",
          discountPrice: 60,
          quantity: 4,
        },
      ],
    },
    {
      id: 2,
      cartnumber: "CART-102",
      customername: "ABC Ltd",
      createdDate: "2024-07-08",
      updatedDate: "2024-05-21",
      status: "Order Confirmed",
      cartItems: [
        {
          id: 5,
          productCode: "P005",
          productName: "Product E",
          discountPrice: 70,
          quantity: 2,
        },
        {
          id: 6,
          productCode: "P006",
          productName: "Product F",
          discountPrice: 80,
          quantity: 1,
        },
      ],
    },
  ];

  const handleViewCart = (item) => {
    router.push(`/manage-request/cart/cart-list/${item?.cartnumber}`);
  };

  const tableItems = corporateCustomerData.map((item, index) => {
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
            {corporateCustomerData.length > 0 ? (
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

export default CorporateCart;
