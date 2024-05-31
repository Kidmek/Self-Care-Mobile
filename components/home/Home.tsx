import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { homeStyle } from './home.style';

import ImageContainer from '~/common/imageContainer/ImageContainer';
import { HOME_STRINGS } from '~/constants/strings/home/home';

export default function Home() {
  const { t: i18n } = useTranslation();

  const navigation = useNavigation();

  const renderCard = (title: string) => {
    return (
      <TouchableOpacity
        style={homeStyle.cardContainer}
        onPress={() => {
          if (title === i18n(HOME_STRINGS.SELF_ASSESSMENT)) {
            // @ts-ignore
            navigation.navigate('assessment');
          }
        }}>
        <Text style={homeStyle.cardTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageContainer>
      <View style={homeStyle.container}>
        {renderCard(i18n(HOME_STRINGS.SELF_ASSESSMENT))}
        {renderCard(i18n(HOME_STRINGS.SELF_CARE_TECHNIQUES))}
      </View>
    </ImageContainer>
  );
}
