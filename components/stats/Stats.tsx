import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import ImageContainer from '~/common/imageContainer/ImageContainer';
import { FONT, SIZES } from '~/constants/theme';

export default function Stats() {
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Stats</Text>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: FONT.regular,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
  },
  container: {
    flex: 1,
    padding: SIZES.large,
    justifyContent: 'space-between',
  },

  singleContainer: {
    gap: SIZES.large,
  },
});
