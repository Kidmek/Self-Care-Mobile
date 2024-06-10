import axios from 'axios';

import { getToken } from './storage';

import { API, LOGIN_API, TIMEOUT } from '~/constants/strings/api';

export const postSkeleton = ({
  url,
  dataToSend,
  params,
  setLoading,
  onSuccess,
  toast,
  successMsg,
  errorMsg,
  headers,
}) => {
  if (setLoading) {
    setLoading(true);
  }
  const token = getToken();
  const isLogin = url === LOGIN_API;
  if (!token) {
    if (isLogin) {
      Unauthorized(setLoading, toast);
      return;
    }
  }
  axios
    .post(
      API + url,
      {
        ...dataToSend,
      },
      {
        timeout: TIMEOUT,
        params,
        headers:
          url === LOGIN_API
            ? null
            : {
                Authorization: 'Bearer ' + token,
                ...headers,
              },
      }
    )
    .then((responseJson) => {
      success(
        responseJson,
        toast,
        onSuccess,
        responseJson?.data.description ?? 'Unable To Save',
        successMsg ?? 'Successfully Saved',
        setLoading
      );
    })
    .catch((error) => {
      catchErr(error, toast, setLoading, url, errorMsg ?? 'Unable To Save', isLogin);
    });
};

export const putSkeleton = ({
  url,
  dataToSend,
  params,
  setLoading,
  onSuccess,
  toast,
  successMsg,
  errorMsg,
}) => {
  if (setLoading) {
    setLoading(true);
  }
  const token = getToken();
  if (!token) {
    Unauthorized(setLoading, toast);
    return;
  }
  axios
    .put(
      API + url,
      {
        ...dataToSend,
      },
      {
        timeout: TIMEOUT,
        params,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then((responseJson) => {
      success(
        responseJson,
        toast,
        onSuccess,
        responseJson?.data.description ?? 'Unable To Update',
        successMsg ?? 'Successfully Updated',
        setLoading
      );
    })
    .catch((error) => {
      catchErr(error, toast, setLoading, url, errorMsg ?? 'Unable To Update');
    });
};

export const getSkeleton = ({ url, params, setLoading, setData, toast, errorMsg, headers }) => {
  if (setLoading) {
    setLoading(true);
  }
  const token = getToken();
  if (!token) {
    Unauthorized(setLoading, toast);
    return;
  }
  axios
    .get(API + url, {
      timeout: TIMEOUT,
      params,
      headers: {
        Authorization: 'Bearer ' + token,
        ...headers,
      },
    })
    .then((responseJson) => {
      success(
        responseJson,
        toast,
        setData,
        responseJson?.data.description ?? 'Unable To Fetch',
        null,
        setLoading,
        headers
      );
    })
    .catch((error) => {
      catchErr(error, toast, setLoading, url, errorMsg ?? 'Unable To Fetch');
    });
};

export const deleteSkeleton = ({
  url,
  params,
  setLoading,
  toast,
  onSuccess,
  successMsg,
  dataToSend,
  errorMsg,
}) => {
  const token = getToken();
  if (setLoading) {
    setLoading(true);
  }
  if (!token) {
    Unauthorized(setLoading, toast);
    return;
  }
  axios
    .delete(API + url, {
      timeout: TIMEOUT,
      data: dataToSend,
      params: { params },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((responseJson) => {
      success(
        responseJson,
        toast,
        onSuccess,
        responseJson?.data.description ?? 'Unable To Delete',
        successMsg ?? 'Successfully Deleted',
        setLoading
      );
    })
    .catch((error) => {
      catchErr(error, toast, setLoading, url, errorMsg ?? 'Unable To Delete');
    });
};

const success = (response, toast, onSuccess, errorMsg, successMsg, setLoading, fullResponse) => {
  if (setLoading) {
    setLoading(false);
  }
  if (response?.data.status === false) {
    if (toast?.show && errorMsg)
      toast?.show(errorMsg, {
        type: 'danger',
      });
    if (response?.data?.data) {
      onSuccess(response?.data?.data);
    }
    return;
  }
  if (onSuccess && response.data) {
    if (fullResponse) {
      onSuccess(response);
    } else {
      onSuccess(response.data);
    }
  }
  if (toast?.show && successMsg) {
    toast?.show(successMsg, {
      type: 'success',
    });
  }
};

const catchErr = (err, toast, setLoading, url, errorMsg, isLogin) => {
  console.log('Error At : ', API + url);
  console.log(err);
  // console.log(Object.keys(err?.response));
  console.log(err.response?.data?.message);
  if (typeof err.response?.data?.message == 'string') {
    errorMsg = err.response?.data?.message;
  }
  if (err?.response?.status === 401) {
    Unauthorized(setLoading, toast, isLogin);
    return;
  }
  if (setLoading) {
    setLoading(false);
  }

  if (toast?.show) {
    toast?.show(errorMsg ?? 'Unable To Update', {
      type: 'danger',
    });
  }
};

const Unauthorized = (setLoading, toast, isLogin) => {
  if (setLoading) {
    setLoading(false);
  }
  if (toast?.show)
    if (isLogin) {
      toast?.show('Wrong Credentials', {
        type: 'danger',
      });
    } else {
      toast?.show('Unauthorized, Please Login Again', {
        type: 'danger',
      });
    }
};
