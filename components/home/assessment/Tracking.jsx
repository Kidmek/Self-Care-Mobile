import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import SingleHistory from './SingleHistory';
import { assessmentStyle } from './assessment.style';

import { getTrackingInfo, setTrackingInfo } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import TrackingModal from '~/components/modal/TrackingModal';
import { HEADER_TYPES } from '~/constants/strings/common';
import { TRACKING_EMOJIS, TRACKING_STRINGS } from '~/constants/strings/home/assessment/tracking';

export default function Tracking() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [history, setHistory] = useState([]);
  const [isHistory, setIsHistory] = useState(false);
  const { t: i18n } = useTranslation();
  const toast = useToast();

  const fetch = async () => {
    if (false) {
      // Fetch from backend and save locally
    } else {
      //
      const data = (await getTrackingInfo()) ?? [];
      setHistory([...data]);
    }
  };
  const renderSingle = (name, emoji) => {
    return (
      <TouchableOpacity
        key={name}
        style={assessmentStyle.singleMood}
        onPress={() => {
          setSelected(name);
          setVisible(true);
        }}>
        <Text style={assessmentStyle.moodName}>{name}</Text>
        <Text style={assessmentStyle.moodEmoji}>{emoji}</Text>
      </TouchableOpacity>
    );
  };
  const renderHistory = (data) => {
    data = data.item;

    const { description, mood, time } = data;
    return (
      <SingleHistory
        time={time}
        description={description}
        title={mood}
        onPressDelete={hanldeDelete}
      />
    );
  };

  const handleSave = (description) => {
    if (false) {
      // save to backend
    }
    const newData = [
      ...history,
      {
        time: new Date(),
        description,
        mood: selected,
      },
    ];
    setTrackingInfo(newData);
    setHistory(newData);
    toast.show('Recorded', {
      type: 'success',
    });
    setIsHistory(true);
    setVisible(false);
  };

  const hanldeDelete = (id) => {
    if (false) {
      // delete from backend
    }
    Alert.alert('', i18n(TRACKING_STRINGS.DELETE_PROMPT), [
      {
        text: 'No',
        onPress: () => null,
      },
      {
        text: 'Yes',
        onPress: () => {
          const newData = [...history.filter((h) => h.time !== id)];
          setTrackingInfo(newData);
          setHistory(newData);
          toast.show('Deleted', {
            type: 'success',
          });
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isHistory) {
        } else {
          return <HeaderIcon name="hourglass-outline" onPress={() => setIsHistory(!isHistory)} />;
        }
      },
      headerLeft: () => {
        return (
          <HeaderIcon
            type={HEADER_TYPES.BACK}
            onPress={isHistory ? () => setIsHistory(!isHistory) : undefined}
          />
        );
      },
    });
  }, [isHistory]);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <ImageContainer>
      <TrackingModal
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        save={handleSave}
      />
      {isHistory ? (
        <FlatList
          data={history}
          renderItem={renderHistory}
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
                {i18n(TRACKING_STRINGS.EMPTY_HISTORY)}
              </Text>
            );
          }}
          // contentContainerStyle={{ ' }}
        />
      ) : (
        <View style={assessmentStyle.container}>
          <Text style={assessmentStyle.headerQns}>{i18n(TRACKING_STRINGS.FEELING_QNS)}</Text>
          <ScrollView contentContainerStyle={assessmentStyle.moodsContainer}>
            {Object.entries(TRACKING_EMOJIS).map(([k, v]) => {
              return renderSingle(i18n(k), v);
            })}
          </ScrollView>
        </View>
      )}
    </ImageContainer>
  );
}
