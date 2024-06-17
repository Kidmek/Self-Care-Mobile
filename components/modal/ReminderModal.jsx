import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import CustomInput from '~/common/input/CustomInput';
import Dropdown from '~/common/input/Dropdown';
import { INPUT_TYPE } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import {
  DAYS,
  REMINDER_FREQUENCY,
  REMINDER_STRINGS,
  REMINDER_TYPES,
} from '~/constants/strings/home/reminder';
import { width } from '~/constants/theme';

const ReminderModal = ({ visible, setVisible, save, selected, t }) => {
  const [value, setValue] = useState({
    type: '',
    frequency: '',
    day: '',
    time: '',
  });
  const [days, setDays] = useState([]);
  const [errors, setErrors] = useState([]);
  const checkIfMultiple = () => {
    return REMINDER_FREQUENCY[value.frequency] === REMINDER_FREQUENCY.BI_WEEKLY;
  };
  const checkFrequency = (frequency) => {
    return REMINDER_FREQUENCY[value.frequency] === frequency;
  };
  const checkIfValid = () => {
    const errors = {};
    if (!value.type?.length) {
      errors.type = t(REMINDER_STRINGS.TYPE_REQUIRED);
    }
    if (!value.frequency?.length) {
      errors.frequency = t(REMINDER_STRINGS.FREQUENCY_REQUIRED);
    }
    if (!value.time?.length) {
      errors.time = t(REMINDER_STRINGS.TIME_REQUIRED);
    }

    if (checkFrequency(REMINDER_FREQUENCY.WEEKLY) && !value.day.length) {
      errors.days = t(REMINDER_STRINGS.DAY_REQUIRED);
    }
    if (checkIfMultiple() && days.length !== 2) {
      errors.days = t(REMINDER_STRINGS.DAYS_REQUIRED);
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={modalStyles.centeredView}>
        <View
          style={{
            ...modalStyles.modalView,
            ...modalStyles.logoutContainer,
            alignItems: 'center',
          }}>
          <View style={{ ...modalStyles.textContainer, width: width * 0.7 }}>
            <Dropdown
              options={Object.entries(REMINDER_TYPES).map(([k, v]) => {
                return {
                  value: k,
                  label: v,
                };
              })}
              selected={value.type}
              setSelected={(selected) => setValue({ ...value, type: selected.value })}
              placeholder={t(REMINDER_STRINGS.TYPE_OF_REMINDER_PLACEHOLDER)}
              label={t(REMINDER_STRINGS.TYPE_OF_REMINDER)}
              zIndex={{ normal: 4000, inverse: 1000 }}
              error={errors['type']}
            />
            <Dropdown
              options={Object.entries(REMINDER_FREQUENCY).map(([k, v]) => {
                return {
                  value: k,
                  label: v,
                };
              })}
              selected={value.frequency}
              setSelected={(selected) => setValue({ ...value, frequency: selected.value })}
              placeholder={t(REMINDER_STRINGS.REMINDER_FREQUENCY_PLACEHOLDER)}
              label={t(REMINDER_STRINGS.REMINDER_FREQUENCY)}
              zIndex={{ normal: 3000, inverse: 2000 }}
              error={errors['frequency']}
            />
            {value.frequency && !checkFrequency(REMINDER_FREQUENCY.DAILY) && (
              <Dropdown
                options={Object.entries(DAYS).map(([k, v]) => {
                  return {
                    value: v,
                    label: v,
                  };
                })}
                selected={checkIfMultiple() ? days : value.day}
                setSelected={(selected) => {
                  if (!checkIfMultiple()) {
                    setValue({ ...value, day: selected.value });
                  }
                }}
                label={t(REMINDER_STRINGS.DAYS)}
                multiple={checkIfMultiple()}
                placeholder={
                  checkIfMultiple()
                    ? t(REMINDER_STRINGS.DAYS_PLACEHOLDER)
                    : t(REMINDER_STRINGS.DAY_PLACEHOLDER)
                }
                zIndex={{ normal: 2000, inverse: 3000 }}
                setValue={checkIfMultiple() && setDays}
                error={errors['days']}
              />
            )}
            <CustomInput
              state={value.time}
              setState={(selected) => setValue({ ...value, time: selected })}
              label={t(REMINDER_STRINGS.TIME)}
              placeholder={t(REMINDER_STRINGS.TIME_PLACEHOLDER)}
              type={INPUT_TYPE.TIME}
              zIndex={{ normal: 1000, inverse: 4000 }}
              error={errors['time']}
            />
          </View>
          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={[modalStyles.neutralBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.CANCEL)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (checkIfValid()) {
                  const data = { ...value, days, createdAt: new Date() };
                  if (!checkFrequency(REMINDER_FREQUENCY.WEEKLY)) {
                    delete data.day;
                  }
                  if (!checkIfMultiple()) {
                    delete data.days;
                  }

                  save(data);
                }
              }}
              style={[modalStyles.acceptBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.SAVE)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;
