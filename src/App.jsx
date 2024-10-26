import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import plantImageDefault from "./assets/defaultImages/img7.jpg";
import { CLASS_NAMES } from "./assets/classNames";
import UploadSection from "./UploadSection.jsx";
import ImageSection from "./ImageSection.jsx";
import { Blocks } from "react-loader-spinner";

import "./App.css";
import cv from "@techstark/opencv-js"; // Import OpenCV from @techstark/opencv-js

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [plantImage, setPlantImage] = useState(plantImageDefault);
  const [detection, setDetection] = useState([]);
  const [isModelRunning, setIsModelRunning] = useState(false);

  const modelRef = useRef(null);
  const canvasRef = useRef(null);

  // Load the model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        modelRef.current = await tf.loadLayersModel(
          "plantdiseasedetection/model/model.json"
        );
        console.log("Model loaded successfully!");
        setIsModelLoaded(true);
      } catch (err) {
        console.error("Error loading model:", err);
      }
    };

    loadModel();

    // Initialize OpenCV
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV is ready!");
    };
  }, []);

  function containsObjectName(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].detection === obj.detection) {
        return true;
      }
    }

    return false;
  }

  // Function to preprocess and make a prediction
  const makePrediction = async (imagePath) => {
    if (!modelRef.current) {
      console.error("Model is not loaded yet.");
      return;
    }

    setIsModelRunning(true);

    const imageElement = new Image();
    imageElement.src = imagePath;

    imageElement.onload = async () => {
      try {
        let imageTensor = tf.browser.fromPixels(imageElement);

        if (imageTensor.shape[2] === 4) {
          imageTensor = tf.slice(imageTensor, [0, 0, 0], [-1, -1, 3]);
        }

        imageTensor = tf.image.resizeBilinear(imageTensor, [128, 128]);
        const inputArray = imageTensor.expandDims(0);

        const prediction = modelRef.current.predict(inputArray);
        const { values, indices } = tf.topk(prediction, 3, 1);

        let detectionArr = [];
        const topValues = await values.array();
        const topIndices = await indices.array();

        topValues.forEach((element, elementIndex) => {
          element.forEach((value, valueIndex) => {
            const resultIndex = topIndices[elementIndex][valueIndex];
            let detectionObj = {};
            detectionObj = {
              detection: CLASS_NAMES[resultIndex],
              value: value * 100,
            };
            let isObjName = containsObjectName(detectionObj, detectionArr);

            if (!isObjName) {
              detectionArr.push(detectionObj);
            }
          });
        });

        await new Promise((r) => setTimeout(r, 2000));

        setDetection(detectionArr);

        // Call the OpenCV function for color segmentation after prediction
        performColorSegmentation(imageElement);
      } catch (error) {
        console.error("Error during prediction:", error);
      } finally {
        setIsModelRunning(false);
      }
    };

    imageElement.onerror = (error) => {
      console.error("Error loading image:", error);
      setIsModelRunning(false);
    };
  };

  const performColorSegmentation = (imageElement) => {
    if (!canvasRef.current) return;

    const canvasTemp = document.createElement("canvas");
    canvasTemp.width = 256;
    canvasTemp.height = 256;
    const ctx = canvasTemp.getContext("2d");
    ctx.drawImage(imageElement, 0, 0, 256, 256);

    const src = cv.imread(canvasTemp);
    const dst = new cv.Mat();

    const hsv = new cv.Mat();
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

    const lowerBound = new cv.Mat(
      hsv.rows,
      hsv.cols,
      hsv.type(),
      [10, 100, 20, 0]
    );
    const upperBound = new cv.Mat(
      hsv.rows,
      hsv.cols,
      hsv.type(),
      [20, 255, 200, 255]
    );

    const mask = new cv.Mat();
    cv.inRange(hsv, lowerBound, upperBound, mask);

    const pinkColor = new cv.Mat(
      src.rows,
      src.cols,
      src.type(),
      [255, 0, 255, 255]
    );
    const coloredDst = new cv.Mat();
    cv.bitwise_and(pinkColor, pinkColor, coloredDst, mask);
    const inverseMask = new cv.Mat();
    cv.bitwise_not(mask, inverseMask);
    const originalBackground = new cv.Mat();
    cv.bitwise_and(src, src, originalBackground, inverseMask);

    cv.add(coloredDst, originalBackground, dst);

    if (canvasRef.current) {
      cv.imshow(canvasRef.current, dst);
    }

    src.delete();
    hsv.delete();
    lowerBound.delete();
    upperBound.delete();
    mask.delete();
    coloredDst.delete();
    inverseMask.delete();
    originalBackground.delete();
    dst.delete();
  };

  const runModel = () => {
    if (isModelLoaded) {
      makePrediction(plantImage);
    } else {
      console.log("Model is still loading, please wait.");
    }
  };

  return (
    <>
      <div className="main">
        <h1>Plant Disease Detection</h1>
        <ImageSection setPlantImage={setPlantImage} />
        <div className="image-container">
          <UploadSection
            setPlantImage={setPlantImage}
            plantImage={plantImage}
          />

          <canvas
            ref={canvasRef}
            className={`result-image ${
              isModelRunning || detection.length === 0 ? "hidden" : ""
            }`}
            height={256}
            width={256}
          ></canvas>

          {isModelRunning && (
            <div className="result-message-container">
              <div className="result-message">
                <Blocks
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperClass="custom-spinner"
                  visible={true}
                />
              </div>
            </div>
          )}

          {!isModelRunning && detection.length === 0 && (
            <div className="result-message-container">
              <p className="result-message">Run Model to see results</p>
            </div>
          )}
        </div>

        <div className="run-model-button">
          <button
            onClick={runModel}
            disabled={!isModelLoaded || isModelRunning}
          >
            {isModelLoaded
              ? isModelRunning
                ? "Processing..."
                : "Run Model"
              : "Loading Model..."}
          </button>
        </div>

        <h2>Detection Results:</h2>
        {isModelRunning ? (
          <div>Waiting for Results...</div>
        ) : (
          <table>
            <tr>
              <th>Disease</th>
              <th>Probability</th>
            </tr>
            {detection.map((item, index) => (
              <tr key={index}>
                <td>{item.detection}</td>
                <td>{item.value.toFixed(2)}%</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
  );
}

export default App;
