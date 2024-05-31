import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { commonStyles } from '../common.style';
import TabIcon from '../tabIcon/TabIcon';

import { HEADER_TYPES } from '~/constants/strings/common';

export default function HeaderIcon({ type }: { type: HEADER_TYPES }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        if (type === HEADER_TYPES.DRAWER) {
          //@ts-ignore
          navigation.openDrawer();
        } else {
          navigation.goBack();
        }
      }}
      style={{ ...commonStyles.headerLeft, margin: 0 }}>
      <TabIcon name={type === HEADER_TYPES.DRAWER ? 'menu' : 'arrow-back'} color="black" />
    </Pressable>
  );
}
