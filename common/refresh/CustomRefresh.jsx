import React from 'react';
import { RefreshControl } from 'react-native';

export default function CustomRefresh({ refreshing, onRefresh }) {
  return (
    <RefreshControl colors={['#9Bd35A', '#689F38']} refreshing={refreshing} onRefresh={onRefresh} />
  );
}
