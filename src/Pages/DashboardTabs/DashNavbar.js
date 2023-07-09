import React from "react";
import { Link } from "react-router-dom";

const DashNavbar = (props) => {
  const { currentTab, setCurrentTab } = props;

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    localStorage.setItem("primepick-currentTab", tab);
  };

  return (
    <>
      <nav className="dash-nav">
        <ul className="dash-nav-list">
          <li
            className={`dash-nav-item ${
              currentTab === "Personal Information" && "dash-tab-active"
            }`}
          >
            <Link
              className={`dash-nav-link `}
              onClick={() => handleTabChange("Personal Information")}
            >
              Personal Information
            </Link>
          </li>
          <li
            className={`dash-nav-link ${
              currentTab === "Address Book" && "dash-tab-active"
            }`}
          >
            <Link onClick={() => handleTabChange("Address Book")}>
              Address Book
            </Link>
          </li>
          <li
            className={`dash-nav-item ${
              currentTab === "My Orders" && "dash-tab-active"
            }`}
          >
            <Link onClick={() => handleTabChange("My Orders")}>My Orders</Link>
          </li>
          <li
            className={`dash-nav-item ${
              currentTab === "My WishList" && "dash-tab-active"
            } `}
          >
            <Link onClick={() => handleTabChange("My WishList")}>
              My Wishlists
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashNavbar;
