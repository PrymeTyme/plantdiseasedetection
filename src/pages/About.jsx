import React from "react";
import precisionrecal from "../assets/1_b8dDC-OGzQRSKHLnK5Y-qg.jpg";
import accuracy from "../assets/outputAccPDD.png";
import overfitting from "../assets/outputover.png";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2>About The Dataset</h2>
      <p>
        {" "}
        This dataset is recreated using offline augmentation from the original
        dataset.The original dataset can be found{" "}
        <a
          href="https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset"
          target="_blank"
        >
          {" "}
          on this kaggle repo
        </a>{" "}
        . This dataset consists of about 87K rgb images of healthy and diseased
        crop leaves which is categorized into 38 different classes.The total
        dataset is divided into 80/20 ratio of training and validation set
        preserving the directory structure. A new directory containing 33 test
        images is created later for prediction purpose.
      </p>

      <h2>
        About The Machine Learning Process using Convolutional Neural Networks
        (CNN)
      </h2>
      <div>
        <p>
          {" "}
          I developed a CNN model for detecting plant diseases from images,
          focusing on optimizing precision and recall to handle data imbalance
          effectively. To avoid overshooting the loss function, I set a small
          learning rate of 0.0001, which provided a stable convergence. To
          address underfitting, I increased the neuron count and added
          additional convolutional layers to capture intricate image features
          with ReLU activation and max-pooling, combined with dense layers for
          effective classification.{" "}
        </p>

        <p>
          To prevent overfitting, I used EarlyStopping with a patience of five
          epochs to stop training when validation loss plateaued, restoring the
          best model weights. Additionally, ReduceLROnPlateau reduced the
          learning rate by 50% after three epochs without improvement, down to a
          minimum of 1e-6. I also implemented data augmentation with rotations,
          shifts, flips, and zoom adjustments to introduce image variation,
          enhancing model generalization.
        </p>

        <p>
          The final model achieved a loss of 0.0226 and an accuracy of 99.22%
          over ten epochs, with a robust architecture comprising over 15 million
          parameters. This approach enabled the model to capture relevant plant
          disease features effectively, reducing both overfitting and
          underfitting while improving prediction accuracy.
        </p>
      </div>
      <div className="img-container">
        <img className="about-img" src={overfitting} alt="overfit" />
        <img className="about-img" src={accuracy} alt="acc" />
      </div>
    </div>
  );
}

export default About;
