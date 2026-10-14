import React, { useRef } from "react";
import uploadIcon from "./assets/upload.svg";
import "./UploadSection.css";

function UploadSection({ setPlantImage, plantImage }) {
  const imageUploadRef = useRef(null);

  const handleImgUpload = (e) => {
    e.preventDefault();

    imageUploadRef.current.click();
  };

  const uploadImageDisplay = () => {
    const uploadedImg = imageUploadRef.current.files[0];

    if (!uploadedImg) return;

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
        <p>Pick or upload your own image</p>
        <form id="form" encType="multipart/form-data">
          <button
            style={{ marginBottom: "10px" }}
            type="submit"
            onClick={handleImgUpload}
          >
            <span className="upload-icon">
              <img src={uploadIcon} alt="Upload Icon" width={45} height={45} />
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
