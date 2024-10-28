import { useStoreState } from 'easy-peasy';
import { Video, ResizeMode, Audio, VideoFullscreenUpdateEvent, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { getLocalSettings } from '~/api/storage';
import { SETTING_STRINGS } from '~/constants/strings/setting';
import { COLORS, SIZES } from '~/constants/theme';

export default function TipVideo({ uri }: { uri: string }) {
  const videoRef = useRef<Video>(null);

  // @ts-ignore
  const sound: Audio.Sound = useStoreState((state) => state.sound);

  const [buffering, setBuffering] = useState(false);

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

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    // @ts-ignore
    const isBuffering = !status.isPlaying && status.shouldPlay;
    if (isBuffering !== buffering) {
      setBuffering(isBuffering);
    }

    // @ts-ignore
    if ((await getLocalSettings())[SETTING_STRINGS.BACKGOUND_MUSIC] && sound) {
      const soundStatus = await sound.getStatusAsync();
      // @ts-ignore
      if (status.shouldPlay) {
        // @ts-ignore
        if (soundStatus.isPlaying) {
          sound.stopAsync();
        }
      } else {
        // @ts-ignore
        if (!soundStatus.isPlaying) {
          sound.playAsync();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={[styles.video]}
        onFullscreenUpdate={onFullscreenUpdate}
        source={{
          uri,
        }}
        useNativeControls={!buffering}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
      {buffering && (
        <View style={styles.overlay}>
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: SIZES.small,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
