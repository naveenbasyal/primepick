import React, { useEffect, useState } from "react";
import EditProfileOverlay from "./EditProfileOverlay";
import { parseISO, format, isValid } from "date-fns";

const Profile = ({ sellerProfile, setSellerProfile }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
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
    <div className="profile position-relative">
      {toggleEdit && (
        <EditProfileOverlay
          setSellerProfile={setSellerProfile}
          sellerProfile={sellerProfile}
          setToggleEdit={setToggleEdit}
        />
      )}

      <span className="editButton" onClick={() => setToggleEdit(true)}>
        Edit
      </span>
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
        <p>
        
          {isValid(parseISO(createdAt))
            ? format(parseISO(createdAt), "dd/MMM/yyyy")
            : "Invalid date"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
