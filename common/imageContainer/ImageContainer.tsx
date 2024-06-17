import React from 'react';
import { ImageBackground } from 'react-native';

import { SIZES, width, height } from '~/constants/theme';

export default function ImageContainer({
  hasTab,
  children,
  noImage,
}: {
  hasTab?: boolean;
  children: any;
  noImage?: boolean;
}) {
  return (
    <ImageBackground
      source={noImage ? undefined : require('~/assets/images/bg.png')}
      resizeMode="cover"
      style={{
        flex: 1,
        paddingTop: SIZES.navHeight,
        paddingBottom: hasTab ? SIZES.tabHeight : 0,
        // position: 'absolute',
        width,
        height,
        top: 0,
        left: 0,
      }}>
      {children}
    </ImageBackground>
  );
}
