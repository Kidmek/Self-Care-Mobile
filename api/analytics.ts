import axios from 'axios';

import { getAnalytics, getToken, setAnalytics } from './storage';

import { API, TIMEOUT } from '~/constants/strings/api';
import { AnalyticField } from '~/constants/strings/common';

export const addAnalyticApi = async ({ type }: { type: AnalyticField }) => {
  const token = await getToken();
  const prevAnalytics = await getAnalytics();
  prevAnalytics[type] = prevAnalytics[type] ? prevAnalytics[type] + 1 : 1;
  axios
    .post(
      API + 'analytics',
      {
        ...prevAnalytics,
      },
      {
        timeout: TIMEOUT,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then(async (res) => {
      console.log('Analytics res', res.data);
      await setAnalytics({ ...prevAnalytics, [type]: 0 });
    })
    .catch(async (err) => {
      console.log('Analytics err', err);
      console.log(err);
      await setAnalytics(prevAnalytics);
    });
};
