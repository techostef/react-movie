import DefaultApi from '../DefaultApi';
import IPayload from '../../interfaces/IPayload';

const getItems = async (payload?: IPayload) => {
  const url = '';
  const res = await DefaultApi.getItems({ url, payload });
  return res;
};

const getItem = async (imdbID) => {
  const url = '';
  const payload: IPayload = {
    params: {
      i: imdbID,
      plot: 'full',
    },
  };
  const res = await DefaultApi.getItems({ url, payload });
  return res;
};

const MovieApi = {
  getItems,
  getItem,
};

export default MovieApi;
