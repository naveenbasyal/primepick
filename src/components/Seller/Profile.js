import React, { useEffect } from "react";

const Profile = (props) => {
  const { sellerProfile, setSellerProfile } = props;
  const {
    address,
    location,
    phone,
    shopName,
    createdAt,
    email,
    logo,
    description,
  } = sellerProfile;


  return (
    <div className="profile">
      <div className="avatar">
        <img src={logo} alt="Avatar" />
      </div>
      <div className="shopName">
        <h4>{shopName}</h4>
      </div>
      <div className="section">
        <span>Email :</span>
        <p>{email}</p>
      </div>
      <div className="section">
        <span>Description :</span>
        <p>{description}</p>
      </div>
      <div className="section">
        <span>Address :</span>
        <p>{address}</p>
      </div>
      <div className="section">
        <span>Location :</span>
        <p>{location}</p>
      </div>
      <div className="section">
        <span>Phone :</span>
        <p>{phone}</p>
      </div>
      <div className="section">
        <span>Joined On :</span>
        <p> {createdAt}</p>
      </div>
    </div>
  );
};

export default Profile;
