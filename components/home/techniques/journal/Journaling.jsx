import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Pressable, StyleSheet, Alert, FlatList } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import SingleHistory from '../../assessment/SingleHistory';
import { assessmentStyle } from '../../assessment/assessment.style';

import { getLocalJournals, setLocalJournals } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import InfoModal from '~/components/modal/InfoModal';
import { JOURNALING_STRINGS } from '~/constants/strings/home/self care/journal';
import { TECHNIQUES_STRINGS } from '~/constants/strings/home/self care/techniques';
import { COLORS, SIZES } from '~/constants/theme';

export default function Journaling() {
  const [journals, setJournals] = useState();
  const [infoVisible, setInfoVisible] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
  const { t } = useTranslation();
  const fetch = async () => {
    const data = (await getLocalJournals()) ?? [];
    setJournals([...data]);
  };

  const hanldeDelete = (id) => {
    Alert.alert('', t(TECHNIQUES_STRINGS.DELETE_PROMPT), [
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

  const renderItem = (data) => {
    data = data.item;
    const { value, title, time } = data;
    return (
      <SingleHistory
        time={time}
        description={value}
        title={title}
        onPressDelete={hanldeDelete}
        onPressEdit={() =>
          navigation.navigate('new', {
            screen: 'journal',
            params: {
              ...data,
              isEdit: true,
            },
          })
        }
        isJournal
        onPress={() => {
          navigation.navigate('new', {
            screen: 'journal',
            params: data,
          });
        }}
      />
    );
  };
  useFocusEffect(() => {
    fetch();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            name="help"
            onPress={() => {
              setInfoVisible(true);
            }}
          />
        );
      },
    });
  });

  return (
    <ImageContainer>
      <InfoModal
        visible={infoVisible}
        setVisible={setInfoVisible}
        t={t}
        type={TECHNIQUES_STRINGS.JOURNALING}
      />

      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={journals}
          renderItem={renderItem}
          contentContainerStyle={{
            ...assessmentStyle.historyContainer,
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  ...assessmentStyle.container,
                  textAlign: 'center',
                  ...assessmentStyle.headerQns,
                }}>
                {t(JOURNALING_STRINGS.EMPTY_JOURNAL_HISTORY)}
              </Text>
            );
          }}
          // contentContainerStyle={{ ' }}
        />
        <Pressable
          style={styles.addButton}
          onPress={() => {
            router.push('techniques/new/journal');
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
