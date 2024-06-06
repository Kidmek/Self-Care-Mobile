import { Video, ResizeMode } from 'expo-av';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { SIZES } from '~/constants/theme';

export default function TipVideo({ uri, setPlaying }) {
  const video = React.useRef(null);
  return (
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      isLooping
      //   onPlaybackStatusUpdate={(status) => console.log(status)}
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
