import React, { useState } from "react";
import chevronUp from "./assets/chevronup.svg";
import chevronDown from "./assets/chevrondown.svg";
import "./ImageSection.css";

const imagePaths = [];

Object.values(
  import.meta.glob("./assets/defaultImages/*.jpg", { eager: true })
).forEach(({ default: path }) => {
  const url = new URL(path, import.meta.url);
  const data = {
    path: url.pathname,
  };
  imagePaths.push(data);
});

function ImageSection({ setPlantImage }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Pick Image:</h2>

      <ul className={`default-img-list ${isExpanded ? "expanded" : ""}`}>
        {imagePaths.map((image, index) => (
          <li className="default-img" key={index}>
            <img
              className="img-border"
              src={image.path}
              alt={`image-${index}`}
              width={100}
              height={100}
              onClick={() => setPlantImage(image.path)}
            />
          </li>
        ))}
      </ul>
      <button className="chevron-button" onClick={toggleIsExpanded}>
        <img
          className="chevron-icon"
          src={isExpanded ? chevronUp : chevronDown}
          alt={isExpanded ? "Collapse" : "Expand"}
        />
      </button>
    </div>
  );
}

export default ImageSection;
