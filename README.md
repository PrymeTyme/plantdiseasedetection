## How It Works

1. **Upload Image**: Go to the Disease Recognition page and upload an image of a plant with suspected diseases.
2. **Analysis**: Our system will process the image using advanced algorithms to identify potential diseases.
3. **Results**: View the results and recommendations for further action.

## About The Dataset

This dataset is recreated using offline augmentation from the original dataset, which can be found [here on Kaggle](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset). It consists of approximately 87,000 RGB images of healthy and diseased crop leaves, categorized into 38 different classes. The dataset is split into an 80/20 ratio for training and validation sets while preserving the directory structure. Additionally, a new directory containing 33 test images has been created for prediction purposes.

## About The Machine Learning Process Using Convolutional Neural Networks (CNN)

I developed a CNN model to detect plant diseases from images, focusing on optimizing precision and recall to effectively handle data imbalance. To ensure stable convergence, I set a small learning rate of 0.0001, preventing overshooting of the loss function. To combat underfitting, I increased the number of neurons and added additional convolutional layers, employing ReLU activation and max pooling, along with dense layers for effective classification.

To mitigate overfitting, I utilized EarlyStopping with a patience of five epochs to halt training when validation loss plateaued, restoring the best model weights. The ReduceLROnPlateau technique was applied to reduce the learning rate by 50% after three epochs without improvement, down to a minimum of 1e-6. Additionally, I implemented data augmentation techniques such as rotations, shifts, flips, and zoom adjustments to introduce image variations and enhance model generalization.

The final model achieved a loss of 0.0226 and an accuracy of 99.22% over ten epochs, featuring a robust architecture with over 15 million parameters. This approach enabled the model to effectively capture relevant plant disease features, reducing both overfitting and underfitting while improving prediction accuracy.

## Quick Demo

![Quick Demo](https://github.com/PrymeTyme/plantdiseasedetection/blob/master/pdd.gif)
