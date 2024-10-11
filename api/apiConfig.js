import axios from 'axios';

import { getLanguage, getToken } from './storage';

import {
  API,
  LOGIN_API,
  REGISTER_API,
  OTP_API,
  OTP_RESEND_API,
  CHANGE_PASS_API,
  RESET_PASS_API,
  TIMEOUT,
  Messages,
} from '~/constants/strings/api';

export const requestSkeleton = async ({
  url,
  method = 'GET', // Default method is GET
  dataToSend = null,
  params = {},
  setLoading = null,
  onSuccess = null,
  toast = null,
  successMsg = null,
  errorMsg = null,
  headers = {},
  noSuccessToast = false,
}) => {
  if (setLoading) setLoading(true);

  const token = await getToken();

  const isLogin = [
    LOGIN_API,
    REGISTER_API,
    OTP_API,
    OTP_RESEND_API,
    CHANGE_PASS_API,
    RESET_PASS_API,
  ].includes(url);
  const language = (await getLanguage()) ?? 'en';

  // Handle unauthorized request if not login-related
  if (!token && !isLogin) {
    Unauthorized(setLoading, toast, language);
    return;
  }

  // Define the axios config
  const config = {
    url: API + url,
    method: method.toLowerCase(),
    timeout: TIMEOUT,
    params,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      language,
      ...headers,
    },
  };

  // Include the data for POST/PUT requests
  if (method === 'POST' || method === 'PUT') {
    config.data = dataToSend;
  }

  // Include params for DELETE requests
  if (method === 'DELETE') {
    config.data = dataToSend;
  }

  // Make the axios request
  axios(config)
    .then((response) => {
      handleSuccess(
        response,
        noSuccessToast ? null : toast,
        onSuccess,
        successMsg ?? Messages[language].success,
        setLoading,
        language
      );
    })
    .catch((error) => {
      handleError(
        error,
        toast,
        setLoading,
        url,
        errorMsg ?? Messages[language].failure,
        isLogin,
        language
      );
    });
};

// Helper function to handle success responses
const handleSuccess = (response, toast, onSuccess, successMsg, setLoading, language) => {
  if (setLoading) setLoading(false);

  const responseData = response?.data;
  console.log(responseData);
  if (responseData?.status === false) {
    if (toast?.show) {
      toast?.show(responseData.description || Messages[language].failure, { type: 'danger' });
    }
    return;
  }

  if (onSuccess) onSuccess(responseData);

  if (toast?.show && successMsg) {
    toast?.show(successMsg, { type: 'success' });
  }
};

// Helper function to handle errors
const handleError = (err, toast, setLoading, url, errorMsg, isLogin, language) => {
  console.log('Error at:', API + url, err);
  console.log(Array.isArray(err.response?.data?.message));
  const errorMessage =
    typeof err.response?.data?.message === 'string'
      ? err.response.data.message
      : Array.isArray(err.response?.data?.message)
        ? err.response.data.message[0]
        : errorMsg;

  if (err?.response?.status === 401) {
    Unauthorized(setLoading, toast, isLogin, language);
    return;
  }

  if (setLoading) setLoading(false);

  if (toast?.show) {
    toast?.show(errorMessage, { type: 'danger' });
  }
};

// Handle unauthorized access
const Unauthorized = (setLoading, toast, isLogin, language) => {
  if (setLoading) setLoading(false);
  const message = isLogin ? Messages[language].wrongCredentials : Messages[language].unauthorized;

  if (toast?.show) toast?.show(message, { type: 'danger' });
};
