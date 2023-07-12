import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import {
  Add,
  ImportContacts,
  LocationCity,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Address = (props) => {
  const [toggleEditAddress, setToggleEditAddress] = useState(false);
  const {
    user,
    toggleAddAddress,
    setToggleAddAddress,
    handleAddAddress,
    loading,
    newAddress,
    handleDeleteAddress,
    setNewAddress,
    setLoading,
    token,
    getUserData,
  } = props;

  const handleEditAddress = (editAddressId) => {
    setToggleEditAddress(true);
    const targetAddress = user.address.filter(
      (add) => add._id === editAddressId
    );
    console.log('target',targetAddress)
    setNewAddress({
      address: targetAddress[0].address,
      landmark: targetAddress[0].landmark,
      city: targetAddress[0].city,
      state: targetAddress[0].state,
      zip: targetAddress[0].zip,
      phone: targetAddress[0].phone,
      addressId:targetAddress[0]._id
    
    });
  };
console.log(newAddress)
  const handleEditAddressSubmit = async (e) => {
    e.preventDefault();
    if (
      newAddress.address === "" ||
      newAddress.city === "" ||
      newAddress.state === "" ||
      newAddress.zip === "" ||
      newAddress.phone === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
    const res =  await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/user/updateaddress`,
        {
          method: "PUT",
          headers: config.headers,
          body: JSON.stringify({...newAddress}),
        }

        
      );
      const data = await res.json();
      console.log(data);
      if(res.ok){
        getUserData();
        setLoading(false);
        setToggleEditAddress(false);
        toast.success("Address Updated Successfully");
        setNewAddress({
          address: "",
          landmark: "",
          city: "",
        });
      }

      else{
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (err) {
      setLoading(false);
      console.log("Error response:", err.response?.data);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="address-tab-content container my-5">
        <p className="mb-5 mt-3 fs-2 centerall fw-bolder">Addresses</p>
        <div className="address-list mulish">
          {user.address.length > 0 ? (
            user.address.map((address, index) => (
              <div key={index} className="text-capitalize address">
                <p className="name fw-bold main-color">{user.name}</p>
                <p className="d-flex flex-wrap ">
                  {address.address} , {address.landmark}
                </p>
                <p className="d-flex flex-wrap ">
                  {address.city} , {address.state} , {address.zip}
                </p>
                <p className="d-flex flex-wrap">
                  <dt className="text-grey fw-lighter">Phone : </dt>
                  <dd className="text-grey"> &nbsp;{address.phone}</dd>
                </p>
                <div className="my-3 d-flex justify-content-between align-items-center">
                  <Button
                    title="Edit Address"
                    onClick={() => {
                      handleEditAddress(address._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    title="Delete Address"
                    onClick={() => {
                      handleDeleteAddress(address._id);
                    }}
                  >
                    {loading === address._id ? (
                      <CircularProgress
                        size={21}
                        style={{ color: "#360b0e" }}
                      />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-capitalize">
              <p className="name centerall fs-2 text-danger">
                No Address Found
              </p>
            </div>
          )}
          <div
            className="text-capitalize new-address"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToggleAddAddress(true);
            }}
          >
            <div>
              <Add />
              <strong>New Address</strong>
            </div>
          </div>
        </div>

        {/* ______________ Edit ADDRESS OVERLAY _____________ */}
        {toggleEditAddress && (
          <div className="address-overlay mulish">
            <div className="address-overlay-content">
              <h3 className="main-color fw-bold">Edit your Address</h3>
              <form onSubmit={handleEditAddressSubmit}>
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  placeholder="Enter your address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImportContacts />
                      </InputAdornment>
                    ),
                  }}
                  label="Address"
                  variant="standard"
                  value={newAddress.address}
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  placeholder="Enter your landmark"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  label="Landmark"
                  value={newAddress.landmark}
                  variant="standard"
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  placeholder="Enter your city"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  label="City"
                  variant="standard"
                  value={newAddress.city}
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  placeholder="Enter your state"
                  label="State"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  value={newAddress.state}
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip: e.target.value })
                  }
                  placeholder="Enter your zip"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  label="Zip"
                  variant="standard"
                  value={newAddress.zip}
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="Enter your phone"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  label="Phone"
                  variant="standard"
                  value={newAddress.phone}
                  required
                />
                <div className="address-overlay-buttons">
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      height: "40px",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    disabled={loading}
                    onClick={handleEditAddressSubmit}
                  >
                    {loading ? (
                      <CircularProgress
                        size={21}
                        style={{ color: "#360b0e" }}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setToggleEditAddress(false);
                    }}
                    style={{
                      width: "100%",
                      height: "40px",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ______________ ADD ADDRESS OVERLAY _____________ */}
        {toggleAddAddress && (
          <div className="address-overlay mulish">
            <div className="address-overlay-content">
              <h3 className="main-color fw-bold">Add New Address</h3>
              <form onSubmit={handleAddAddress}>
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  placeholder="Enter your address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImportContacts />
                      </InputAdornment>
                    ),
                  }}
                  label="Address"
                  variant="standard"
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  placeholder="Enter your landmark"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                  label="Landmark"
                  variant="standard"
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  placeholder="Enter your city"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  label="City"
                  variant="standard"
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  placeholder="Enter your state"
                  label="State"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip: e.target.value })
                  }
                  placeholder="Enter your zip"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity />
                      </InputAdornment>
                    ),
                  }}
                  label="Zip"
                  variant="standard"
                  required
                />
                <TextField
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="Enter your phone"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  label="Phone"
                  variant="standard"
                  required
                />
                <div className="address-overlay-buttons">
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      height: "40px",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} /> : "Add Address"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setToggleAddAddress(false);
                      setNewAddress({
                        address: "",
                        landmark: "",
                        city: "",
                        state: "",
                        zip: "",
                        phone: "",
                      });
                    }}
                    style={{
                      width: "100%",
                      height: "40px",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
