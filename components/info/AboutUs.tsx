import React from 'react';
import { View, Text } from 'react-native';

import ImageContainer from '~/common/imageContainer/ImageContainer';

export default function AboutUs() {
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <Text>AboutUs</Text>
    </ImageContainer>
  );
}
