import React from 'react';
import Lottie from 'react-lottie';

function LottieAnimation({ animationData, loop=false}) {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: animationData,
  };

  return <Lottie options={defaultOptions} />;
}

export default LottieAnimation;
