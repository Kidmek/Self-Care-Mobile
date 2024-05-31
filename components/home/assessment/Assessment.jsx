import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { homeStyle } from '../home.style';

import ImageContainer from '~/common/imageContainer/ImageContainer';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';

export default function Assessment() {
  const navigation = useNavigation();
  const { t: i18n } = useTranslation();
  const renderCard = (title) => {
    return (
      <TouchableOpacity
        style={homeStyle.cardContainer}
        onPress={() => {
          // @ts-ignore
          if (title === i18n(ASSESSMENT_STRINGS.LIFE_WHEEL)) {
            navigation.navigate('assessment', {
              screen: 'wheel',
            });
          } else {
            navigation.navigate('assessment', {
              screen: 'tracking',
            });
          }
        }}>
        <Text style={homeStyle.cardTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageContainer>
      <View style={homeStyle.container}>
        {renderCard(i18n(ASSESSMENT_STRINGS.LIFE_WHEEL))}
        {renderCard(i18n(ASSESSMENT_STRINGS.MOOD_TRACKING))}
      </View>
    </ImageContainer>
  );
}
