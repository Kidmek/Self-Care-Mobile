import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { commonStyles } from '../common.style';
import TabIcon from '../tabIcon/TabIcon';

import { HEADER_TYPES } from '~/constants/strings/common';
import { SIZES } from '~/constants/theme';

export default function HeaderIcon({
  type,
  name,
  onPress,
  color,
}: {
  type: HEADER_TYPES;
  name?: keyof typeof Ionicons.glyphMap | undefined;
  onPress?: (() => void) | undefined;
  color?: string;
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        if (type === HEADER_TYPES.DRAWER) {
          //@ts-ignore
          navigation.openDrawer();
        } else {
          navigation.goBack();
        }
      }}
      style={{
        ...commonStyles.headerLeft,
        marginHorizontal: type === HEADER_TYPES.DRAWER ? SIZES.medium : 0,
        backgroundColor: color ?? 'transparent',
      }}>
      <TabIcon
        name={name ? name : type === HEADER_TYPES.DRAWER ? 'menu' : 'arrow-back'}
        color={color ? 'white' : 'black'}
      />
    </Pressable>
  );
}
