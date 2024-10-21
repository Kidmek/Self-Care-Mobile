import { useStoreActions } from 'easy-peasy';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

type Props = {
  sound: Audio.Sound | null | undefined;
};
export default function BackgroundMusic({ sound }: Props) {
  // @ts-ignore
  const setSound = useStoreActions((state) => state.setSound);
  useEffect(() => {
    if (sound) {
      setSound(sound);
    }
  }, [sound]);
  return null;
}
