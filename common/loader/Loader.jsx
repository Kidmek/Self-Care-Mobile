import { useStoreState } from 'easy-peasy';
import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
  const loading = useStoreState((state) => state.loading);
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating
            color="#000000"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

export default Loader;
