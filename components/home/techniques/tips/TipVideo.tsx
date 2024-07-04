import { Video, ResizeMode, VideoFullscreenUpdateEvent } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { SIZES } from '~/constants/theme';

export default function TipVideo({ uri }: { uri: string }) {
  const videoRef = useRef<Video>(null);

  const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
    if (Platform.OS === 'android') {
      switch (fullscreenUpdate) {
        case 0:
          await ScreenOrientation.unlockAsync();
          break;
        case 2:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          break;
      }
    }
  };
  return (
    <Video
      ref={videoRef}
      style={[styles.video]}
      onFullscreenUpdate={onFullscreenUpdate}
      source={{
        uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
    />
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: SIZES.small,
  },
});
