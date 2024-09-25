import { useStoreActions, useStoreState } from 'easy-peasy';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Carousel from 'react-native-reanimated-carousel';
import { useToast } from 'react-native-toast-notifications';

import Pagination from './Pagination';
import TipVideo from './TipVideo';
import { assessmentStyle } from '../../assessment/assessment.style';

import { addAnalyticApi } from '~/api/analytics';
import { requestSkeleton } from '~/api/apiConfig';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { MEDIA_URL } from '~/constants/strings/api';
import { MEDIA_TYPE, TECHNIQUES_STRINGS } from '~/constants/strings/home/self care/techniques';
import { COLORS, FONT, SIZES, width } from '~/constants/theme';
import { checkIfAmh } from '~/utils/helper';

export default function Tips() {
  const params = useLocalSearchParams();
  const [tips, setTips] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const setFetching = useStoreActions((actions) => actions.setLoading);
  const fetching = useStoreState((state) => state.loading);
  const [selected, setSelected] = useState([]);
  const { t: i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState({});

  const fetch = () => {
    requestSkeleton({
      mehod: 'GET',
      url: `tips/type/${params?.type}`,
      toast,
      setLoading: (loading) => {
        if (tips) {
          setLoading(loading);
        } else {
          setFetching(loading);
        }
      },
      setData: (data) => {
        setTips(data);
      },
    });
  };

  const renderItem = ({ item, index }) => {
    const pictures = item?.media?.filter((m) => m.type === MEDIA_TYPE.PIC);
    const title = checkIfAmh() ? item.amh_title : item.title;
    const description = checkIfAmh() ? item.amh_description : item.description;
    return (
      <View style={styles.singleContainer}>
        {item?.media?.length > 0 && (
          <View>
            <Carousel
              height={width / 2}
              width={width * 0.85}
              data={item?.media}
              loop={false}
              onSnapToItem={(current) => {
                setActiveIndexes({ ...activeIndexes, [index]: current });
              }}
              renderItem={(innerItem) => {
                const media = innerItem.item;
                if (media.type === MEDIA_TYPE.PIC) {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(pictures);
                        setIndex(innerItem.index);
                        setIsVisible(true);
                      }}>
                      <Image
                        style={{ ...styles.image, alignSelf: 'center' }}
                        source={{ uri: `${MEDIA_URL}/pictures/${media?.fileName}` }}
                      />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <View style={{ ...styles.image, alignSelf: 'center' }}>
                      <TipVideo uri={`${MEDIA_URL}/videos/${media?.fileName}`} />
                    </View>
                  );
                }
              }}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />

            <Pagination length={item?.media?.length} active={activeIndexes?.[index] ?? 0} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>

        {description && <Text style={styles.description}>{description}</Text>}
        <View style={commonStyles.divider(COLORS.black)} />
      </View>
    );
  };

  useEffect(() => {
    if (params?.type) {
      fetch();
      addAnalyticApi({
        type: params.type,
      });
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <ImageContainer>
      <ImageView
        images={selected.map((img) => {
          return { uri: `${MEDIA_URL}/pictures/${img?.fileName}` };
        })}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        swipeToCloseEnabled
        FooterComponent={({ imageIndex }) => {
          return (
            <Text style={styles.footer}>
              {imageIndex + 1} / {selected?.length}
            </Text>
          );
        }}
      />
      <View style={commonStyles.container()}>
        <FlatList
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={() => fetch()}
          data={tips}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            if (!fetching && !loading)
              return (
                <Text
                  style={{
                    ...assessmentStyle.container,
                    textAlign: 'center',
                    ...assessmentStyle.headerQns,
                  }}>
                  {i18n(TECHNIQUES_STRINGS.EMPTY_TIPS)}
                </Text>
              );
          }}
        />
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: SIZES.small,
    alignSelf: 'center',
  },
  footer: {
    color: 'white',
    textAlign: 'center',
    fontFamily: FONT.bold,
    marginBottom: SIZES.large,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    textTransform: 'capitalize',
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    textTransform: 'capitalize',
    // color: COLORS.circleAndInfo,
  },
});
