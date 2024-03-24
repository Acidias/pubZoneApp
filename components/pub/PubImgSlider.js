import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const { width } = Dimensions.get('window');
const headerHeight = 200; // Adjust the height as needed

const PubImgSlider = ({ images }) => {
  const imageUrls = images ||  [
    'https://via.placeholder.com/450x250/ff7f7f/333333',
    'https://via.placeholder.com/450x250/7f7fff/333333',
    'https://via.placeholder.com/450x250/ffff7f/333333',
  ];

  return (
    <SliderBox
    images={imageUrls}
    sliderBoxHeight={width / 2}
    paginationBoxStyle={{
      position: 'absolute',
      bottom: 15, // you can adjust this value as needed
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      borderRadius: 10,
      // Explicitly set the width and height to fit the dots
      width: 'auto',
      height: 'auto',
      padding: 0, // Remove or reduce padding
    }}
    dotStyle= {{ 
      backgroundColor: "rgba(0, 0, 0, 0.8)", 
      width: 8, 
      height: 8, 
      borderRadius: 5, 
      margin: -3 // Keep the margin 0 to maintain the size
    }}
    dotColor="blue"
    inactiveDotColor="#90A4AE"
    circleLoop
    disableOnPress
  />
  
  );
};


export default PubImgSlider;
