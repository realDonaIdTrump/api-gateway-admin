import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../lotties/Vector_Logo_black_red_RGB.json'; // Your Lottie file path

function LottieAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} />;
}

export default LottieAnimation;
