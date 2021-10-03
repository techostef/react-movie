import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

interface ICallApi {
  data?: any,
  method?: any,
  params?: any,
  route?: any,
  serviceUrl?: any,
}

const callApi = async (payload: ICallApi) => {
  const url = payload.serviceUrl + payload.route;
  let response: any = null;
  await axios({
    method: payload.method,
    url,
    data: payload.data,
    params: payload.params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  })
    .then((res) => {
      // data.headers.xPagination = (
      //     data.headers['x-pagination'] ?
      //     JSON.parse(data.headers['x-pagination']) : null
      // );
      response = res;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        response = error;
      }
    });
  return response;
};

const handleResultRequest = (result: any, useNotificationError = true) => {
  // console.log('mock jest', process?.env?.JEST_WORKER_ID);
  return new Promise((resolve, reject) => {
    if (isSuccess(result)) {
      if (result?.data?.Error) {
        if (useNotificationError) {
          notification.info({
            message: 'Notification Error',
            description: result?.data?.Error,
            placement: 'bottomRight',
          });
        }
        reject(result);
      } else {
        resolve(result.data);
      }
    } else {
      if (useNotificationError) {
        let message = result?.result ?? 'Network Error';
        if (result?.data?.Error) {
          message = result.data.Error;
        }

        notification.info({
          message: 'Notification Error',
          description: message,
          placement: 'bottomRight',
        });
      }
      reject(result);
    }
  });
};

const isSuccess = (result: any) => {
  if (result.status >= 200 && result.status <= 300) return true;

  return false;
};

const RestHelper = {
  isSuccess,
  handleResultRequest,
  callApi,
};

export default RestHelper;
