import { useStoreState } from 'easy-peasy';
import { Video, ResizeMode, Audio, VideoFullscreenUpdateEvent } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { getLocalSettings } from '~/api/storage';
import { SETTING_STRINGS } from '~/constants/strings/setting';
import { SIZES } from '~/constants/theme';

export default function TipVideo({ uri }: { uri: string }) {
  const videoRef = useRef<Video>(null);

  // @ts-ignore
  const sound: Audio.Sound = useStoreState((state) => state.sound);

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
      onPlaybackStatusUpdate={async (status) => {
        // @ts-ignore
        if ((await getLocalSettings())[SETTING_STRINGS.BACKGOUND_MUSIC]) {
          // @ts-ignore
          if (status.isPlaying) {
            sound.stopAsync();
          } else {
            sound.playAsync();
          }
        }
      }}
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
