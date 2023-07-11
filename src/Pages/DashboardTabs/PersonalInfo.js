import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import {
  BiotechRounded,
  MailOutline,
  Person2Rounded,
  SupervisedUserCircle,
} from "@mui/icons-material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PersonalInfo = (props) => {
  const { user, setUser, toggleEdit, setToggleEdit, loading, token } = props;

  const [preImg, setPreImg] = useState(user?.profile);
  const [profile, setProfile] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreImg(reader.result);
    };
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("username", user.username);
    formData.append("bio", user.bio);
    formData.append("profile", profile ? profile : "");

    try {
      setWaiting(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/user/editprofile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const updatedUser = await res.json();
      setWaiting(false);

      if (updatedUser.user) {
        setUser(updatedUser.user);
        toast.success(updatedUser.msg);
        setToggleEdit(false);
      } else {
        toast.error("Something went wrong");
        setToggleEdit(false);
        return;
      }
    } catch (err) {
      console.log(err);
      setToggleEdit(false);
      setWaiting(false);
    }
  };

  return (
    <>
      <div className="dash-tab-content container my-5 ">
        <div className="dash-tab-content-header row justify-content-center">
          <div className="dash-tab-content-body col-lg-8 col-sm-12">
            <form onSubmit={handleEditUser}>
              {/* ___________________ PROFILE PHOTO FIELD __________________ */}
              <div className="name mb-2">
                <div className="profile-img centerall flex-column">
                  <img
                    src={preImg}
                    alt="profile picture"
                    className="img-fluid mb-4"
                  />
                  {toggleEdit && (
                    <div className="upload-button ">
                      <label htmlFor="profile-img" className="u-f-b centerall">
                        Upload Image
                        <input
                          type="file"
                          className="form-control"
                          id="profile-img"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              {/* ___________________ NAME FIELD __________________ */}
              <div className="name mb-5">
                <div className="name-header d-flex align-items-center">
                  <h5>Name</h5>
                  <Button
                    variant={toggleEdit ? "outlined" : "text"}
                    onClick={() => setToggleEdit(!toggleEdit)}
                  >
                    {toggleEdit ? "Cancel" : "Edit"}
                  </Button>
                </div>
                <TextField
                  disabled={!toggleEdit}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person2Rounded className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Name"
                  variant={toggleEdit ? "standard" : "filled"}
                  value={user.name}
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="form-control "
                />
              </div>

              {/* ___________________ USERNAME FIELD __________________ */}
              <div className="name mb-5">
                <div className="name-header d-flex align-items-center">
                  <h5>User Name</h5>
                </div>
                <TextField
                  disabled={!toggleEdit}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SupervisedUserCircle className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="User Name"
                  variant={toggleEdit ? "standard" : "filled"}
                  value={user.username}
                  type="text"
                  name="username"
                  placeholder="User Name"
                  className="form-control"
                />
              </div>
              {/* ___________________ EMAIL FIELD __________________ */}
              <div className="email mb-5">
                <div className="email-header d-flex align-items-center">
                  <h5>Email Address</h5>
                </div>
                <TextField
                  disabled={true}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Email"
                  variant={toggleEdit ? "standard" : "filled"}
                  value={user.email}
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="form-control "
                />
              </div>
              {/* ___________________ BIO FIELD __________________ */}
              <div className="bio">
                <div className="bio-header d-flex align-items-center">
                  <h5>Bio Address</h5>
                </div>
                <TextField
                  disabled={!toggleEdit}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiotechRounded className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Bio"
                  variant={toggleEdit ? "standard" : "filled"}
                  value={user.bio}
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  className="form-control "
                />
              </div>

              {/* ___________________ SAVE BUTTON __________________ */}

              {toggleEdit && (
                <div className="save-btn mt-5">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      height: "40px",
                      cursor: waiting ? "not-allowed" : "pointer",
                    }}
                    disabled={waiting}
                  >
                    {waiting ? (
                      <CircularProgress
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
