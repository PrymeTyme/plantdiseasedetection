import React from "react";
import homeplant from "../assets/homePlant.jpeg";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Plant Disease Recognition System!</h1>
      <img className="home-img" src={homeplant} alt="homeplant" />
      <p>
        Our mission is to help in identifying plant diseases efficiently. Upload
        an image of a plant, and our system will analyze it to detect any signs
        of diseases
      </p>
      <h2>How It Works</h2>

      <ul className="bullet-point-container">
        <li>
          {" "}
          <span style={{ fontWeight: "bold" }}> 1. Upload Image: </span>Go to
          the{" "}
          <Link to={"/plantdiseasedetection/detect"}>Disease Recognition</Link>{" "}
          page and upload an image of a plant with suspected diseases.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>2. Analysis:</span> Our system
          will process the image using advanced algorithms to identify potential
          diseases.
        </li>
        <li>
          {" "}
          <span style={{ fontWeight: "bold" }}>3. Results:</span> View the
          results and recommendations for further action.
        </li>
      </ul>

      <h2>Why Choose Us?</h2>

      <ul className="bullet-point-container">
        <li>
          <span style={{ fontWeight: "bold" }}>- Accuracy:</span> Our system
          utilizes state-of-the-art machine learning techniques for accurate
          disease detection.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>- User-Friendly:</span> Simple
          and intuitive interface for seamless user experience.
        </li>
        <li>
          <span style={{ fontWeight: "bold" }}>- Fast and Efficient:</span>{" "}
          Receive results in seconds, allowing for quick decision-making.
        </li>
      </ul>

      <h2>Get Started</h2>
      <p>
        Click on the{" "}
        <Link to={"/plantdiseasedetection/detect"}>Disease Recognition</Link>{" "}
        page in the navbar to upload an image and experience the power of our
        Plant Disease Recognition System!
      </p>
      <h2>About Us</h2>
      <p>
        Learn more about the project, our team, and our goals on the{" "}
        <Link to={"/plantdiseasedetection/about"}>About </Link>
        page.
      </p>
    </div>
  );
}

export default Home;
