import React, { useState, useEffect, useRef } from "react";
import uploadIcon from "./assets/upload.svg";
import "./UploadSection.css";
import testimg from "./assets/defaultImages/img1.jpg";

function UploadSection({ setPlantImage, plantImage }) {
  const imageUploadRef = useRef(null);

  const handleImgUpload = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    imageUploadRef.current.click();
    //setImgUpload(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImageDisplay = () => {
    const uploadedImg = imageUploadRef.current.files[0];

    const cachedURL = URL.createObjectURL(uploadedImg);

    setPlantImage(cachedURL);
  };
  return (
    <div className="upload-card">
      <img
        src={plantImage}
        alt="Upload or Choose Image"
        className="upload-card-img"
      />
      <div className="upload-card-body">
        <p>pick or upload you own image</p>
        <form id="form" encType="multipart/form-data">
          <button
            style={{ marginBottom: "10px" }}
            type="submit"
            onClick={handleImgUpload}
          >
            <span className="upload-icon">
              <img src={uploadIcon} alt="icon" width={45} height={45} />
            </span>
          </button>
          <input
            hidden
            type="file"
            ref={imageUploadRef}
            onChange={uploadImageDisplay}
            accept="image/*"
          />
        </form>
      </div>
    </div>
  );
}

export default UploadSection;
