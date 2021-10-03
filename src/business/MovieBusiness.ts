import { AxiosResponse } from 'axios';
import MovieApi from '../api/movie/MovieApi';
import RestHelper from '../helper/RestHelper';

const getListTitleMovie = async (title: string) => {
  const res = await MovieApi.getItems({
    params: {
      s: title,
    },
  }).then((response) => {
    return RestHelper.handleResultRequest(response).then((data: any) => {
      return data?.Search?.map((item) => ({
        label: item?.Title,
        value: item?.imdbID,
      })) ?? [];
    });
  });
  return res;
};

const getRatingToNumber = (value: string) => {
  if (value.indexOf('/') >= 0) {
    const split = value.split('/');
    return (parseFloat(split?.[0]) ?? 0) / 2;
  } if (value.indexOf('%') >= 0) {
    return parseInt(value, 10) * 0.1;
  }
  return 0;
};

const getInfoDetailMovie = async (imdID) => MovieApi.getItem(imdID)
  .then((response: AxiosResponse) => RestHelper.handleResultRequest(response)
    .then((data: any) => data));

const MovieBusiness = {
  getListTitleMovie,
  getInfoDetailMovie,
  getRatingToNumber,
};

export default MovieBusiness;
