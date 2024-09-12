import React from 'react';
import Lottie from 'react-lottie';

function LottieAnimation({ animationData }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} />;
}

export default LottieAnimation;
