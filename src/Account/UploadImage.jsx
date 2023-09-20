import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function UploadImage({ setAvatarImage }) {
  const [avatarImageUrl, setAvatarImageUrl] = useState(null);

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const handleAvatarUpload = (e) => {
    const selectedImage = e.target.files[0];
    console.log('selectedImage: ', selectedImage);
    setAvatarImageUrl(URL.createObjectURL(selectedImage));
    setAvatarImage(selectedImage);
  };

  return (
    <div>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          bgcolor: "deepOrange[500]",
          margin: "auto",
          cursor: "pointer",
        }}
        alt="User"
        src={avatarImageUrl || "/default-image.jpg"}
        onClick={handleAvatarClick}
      />

      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleAvatarUpload}
      />
    </div>
  );
}

export default UploadImage;
