"use client";

import React from "react";
import "./index.css";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const QuoteRequestList = () => {
  const router = useRouter();

  return (
    <>
      <div className="ps-section__content">
        <div className="ps-section__actions d-flex justify-content-between">
          <button
            onClick={() => router.push("/manage-request/quotes")}
            className="ps-btn success"
          >
            <FaArrowLeftLong className="me-2" />
            Back to Quotes
          </button>
        </div>

        <div class="product_card">
          <div class="product_img">
            <img
              src="https://market.thingpark.com/media/catalog/product/cache/496f4b8029935cd1a435219c05e3e604/s/m/smart-energy-iot-new-boundary-technologies-1024x665-removebg-preview.jpg"
              class="w-100"
            />
          </div>
          <div class="product_detail">
            <span class="product_stock">In Stock</span>
            <p>
              New Boundary Technologies | RemoteVista IoT Web Application
              Starter Kit
            </p>
            <div class="product_info_inr">
              <div class="product_sku">
                <h3>SKU: 2011-16369</h3>
              </div>
              <div class="product_price_info">
                <div class="row">
                  <div class="col-md-3">
                    <div class="product_price">
                      <p>Original price</p>
                      <h3>€995.00</h3>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="your_price position-relative">
                      <input
                        type="text"
                        class="form-control "
                        placeholder="Your Price"
                      />
                      <MdInfoOutline
                        className="your_price_input"
                        title="propose your price for this product"
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="product_qty">
                      <span class="product_qty_counter">
                        <FaMinus />
                      </span>
                      <input type="text" class="form-control" value="2" />
                      <span class="product_qty_counter">
                        <FaPlus />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="customer_review mt-4">
              <textarea
                name=""
                rows="4"
                class="form-control"
                id=""
                placeholder="Your comment"
              ></textarea>
            </div>
          </div>
          <button class="del_btn btn">
            <FaTrash />
          </button>
        </div>
        <div className="d-flex justify-content-between">
          <button className="clear_quote_btn">Clear Quote</button>
          <button className="clear_quote_btn">Submit Quote</button>
        </div>
      </div>
    </>
  );
};

export default QuoteRequestList;
