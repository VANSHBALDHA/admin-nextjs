"use client";

import React from "react";
import Link from "next/link";

export default function InvoiceDetail() {
  const invoiceProducts = [
    {
      id: "6",
      thumbnail: "/static/img/products/shop/5.jpg",
      title: "Grand Slam Indoor Of Show Jumping Novel",
      vendor: "Robert's Store",
      sale: true,
      price: "32.99",
      salePrice: "41.00",
      rating: true,
      ratingCount: "4",
      badge: [
        {
          type: "sale",
          value: "-37%",
        },
      ],
    },
    {
      id: "7",
      thumbnail: "/static/img/products/shop/6.jpg",
      title: "Sound Intone I65 Earphone White Version",
      vendor: "Youngshop",
      sale: true,
      price: "100.99",
      salePrice: "106.00",
      rating: true,
      ratingCount: "5",
      badge: [
        {
          type: "sale",
          value: "-5%",
        },
      ],
    },
  ];

  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>
                    Invoice #500884010 -<strong>Successful delivery</strong>
                  </h3>
                </div>
                <div className="ps-section__content">
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Address</figcaption>
                        <div className="ps-block__content">
                          <strong>John Walker</strong>
                          <p>Address: 3481 Poe Lane, Westphalia, Kansas</p>
                          <p>Phone: 913-489-1853</p>
                        </div>
                      </figure>
                    </div>
                    <div className="col-md-4 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Shipping Fee</figcaption>
                        <div className="ps-block__content">
                          <p>Shipping Fee: Free</p>
                        </div>
                      </figure>
                    </div>
                    <div className="col-md-4 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Payment</figcaption>
                        <div className="ps-block__content">
                          <p>Payment Method: Visa</p>
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table ps-table--shopping-cart">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="ps-product--cart">
                              <div class="ps-product__thumbnail">
                                <a href="/product/6">
                                  <img
                                    src="https://placehold.co/400x400"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div class="ps-product__content">
                                Grand Slam Indoor Of Show Jumping Novel
                              </div>
                            </div>
                          </td>
                          <td class="price">$32.99</td>
                          <td>1</td>
                          <td class="price">$32.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <Link href="/account/invoices" className="ps-btn ps-btn--sm ">
                    Back to invoices
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
