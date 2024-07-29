"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import IndividualCart from "./IndividualCart";
import CorporateCart from "./CorporateCart";

const CartRequest = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Individual Customer</Tab>
          <Tab>Corporate Customer</Tab>
        </TabList>

        <TabPanel>
          <IndividualCart />
        </TabPanel>
        <TabPanel>
          <CorporateCart />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CartRequest;
