import { Stack } from 'expo-router';
import React from 'react';

import HeaderIcon from '~/common/header/HeaderIcon';
import { HEADER_TYPES } from '~/constants/strings/common';

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerLeft: () => <HeaderIcon type={HEADER_TYPES.BACK} />,
        headerTitle: '',
      }}>
      <Stack.Screen name="journaling" options={{}} />
      <Stack.Screen name="sleeping" options={{}} />
    </Stack>
  );
}
