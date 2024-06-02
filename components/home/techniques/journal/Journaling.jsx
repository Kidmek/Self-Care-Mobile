import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable, StyleSheet, Alert, FlatList } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { techniqueStyles } from '../techniques.style';

import { getLocalJournals, setLocalJournals } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { TECHNIQUES_STRINGS } from '~/constants/strings/home/self care/techniques';
import { COLORS, SIZES } from '~/constants/theme';

export default function Journaling() {
  const [journals, setJournals] = useState();
  const navigation = useNavigation();
  const toast = useToast();
  const { t: i18n } = useTranslation();
  const fetch = async () => {
    if (false) {
      // Fetch from backend and save locally
    } else {
      //
      const data = (await getLocalJournals()) ?? [];
      setJournals([...data]);
    }
  };

  const hanldeDelete = (id) => {
    if (false) {
      // delete from backend
    }
    Alert.alert('', i18n(TECHNIQUES_STRINGS.DELETE_PROMPT), [
      {
        text: 'No',
        onPress: () => null,
      },
      {
        text: 'Yes',
        onPress: () => {
          const newData = [...journals.filter((h) => h.time !== id)];
          setLocalJournals(newData);
          setJournals(newData);
          toast.show('Deleted', {
            type: 'success',
          });
        },
      },
    ]);
  };

  const renderItem = () => {};
  useEffect(() => {
    fetch();
  }, []);
  return (
    <ImageContainer>
      <View style={commonStyles.innerContainer}>
        <Pressable
          style={styles.addButton}
          onPress={() => {
            router.push('techniques/new/journy');
          }}>
          <Ionicons name="add" size={SIZES.xxLarge} />
        </Pressable>
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: SIZES.xxLarge,
    right: SIZES.xxLarge,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.primaryColors.lightBlue,
    padding: SIZES.medium,
  },
});
