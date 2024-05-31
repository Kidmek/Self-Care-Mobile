import React from 'react';
import { ImageBackground } from 'react-native';

import { SIZES } from '~/constants/theme';

export default function ImageContainer({ children }) {
  return (
    <ImageBackground
      source={require('~/assets/images/bg.png')}
      resizeMode="cover"
      style={{
        flex: 1,
        paddingTop: SIZES.navHeight,
      }}>
      {children}
    </ImageBackground>
  );
}
