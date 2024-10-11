import { Ionicons } from '@expo/vector-icons';
import { View, Text, Modal, Pressable } from 'react-native';

import { modalStyles } from './modal.style';

import { SIZES } from '~/constants/theme';

export default function WheelDescriptionModal({
  title,
  description,
  visible,
  hide,
}: {
  title: string;
  description: string;
  visible: boolean;
  hide: () => void;
}) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={hide}>
      <View style={modalStyles.centeredView}>
        <View
          style={{
            ...modalStyles.modalView,
            ...modalStyles.logoutContainer,
            padding: SIZES.large,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              maxWidth: '100%',
              minWidth: '100%',
            }}>
            <Text style={modalStyles.modalHeader}>{title}</Text>
            <Pressable onPress={hide}>
              <Ionicons
                name="close-circle-outline"
                style={{
                  alignSelf: 'flex-end',
                }}
                size={SIZES.tabIcons}
              />
            </Pressable>
          </View>
          <Text style={[modalStyles.modalText]}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
}
