import { batch } from 'react-redux';
import movieStateAction from './movieStateAction';
import IState from '../../interfaces/IState';
import RestHelper from '../../helper/RestHelper';
import MovieApi from '../../api/movie/MovieApi';
import IParamsApi from '../../interfaces/IParamsApi';
import IPayload from '../../interfaces/IPayload';

const getFetchData = (params: IParamsApi) => {
  return async (dispatch) => {
    dispatch(movieStateAction.editPropertyStateByKey('isLoading', true));
    await MovieApi.getItems({
      params,
    })
      .then((response) => {
        RestHelper.handleResultRequest(response).then((data: any) => {
          batch(() => {
            dispatch(movieStateAction.restoreData(data?.Search));
            dispatch(movieStateAction.editPropertyStateByKey('totalItems', data?.totalResults));
          });
        });
      })
      .finally(() => {
        dispatch(movieStateAction.editPropertyStateByKey('isLoading', false));
      });
  };
};

const firstSearchData = (params: IParamsApi) => {
  return async (dispatch) => {
    dispatch(movieStateAction.editPropertyStateByKey('pageNumber', 1));
    dispatch(getFetchData(params));
  };
};

const loadMoreData = (search: string, pageNumber: number) => {
  return async (dispatch, getState) => {
    const state: IState = getState();
    const movieState = state.movieState.toJS();
    const payload: IPayload = {
      params: {
        s: search,
        page: pageNumber,
      },
    };
    movieStateAction.editPropertyStateByKey('isLoading', true);
    await MovieApi.getItems(payload).then((response) => {
      RestHelper.handleResultRequest(response).then((data: any) => {
        const newData = data?.Search ?? [];
        dispatch(movieStateAction.editPropertyStateByKey('pageNumber', pageNumber));
        dispatch(movieStateAction.editPropertyStateByKey('totalItems', data?.totalResults));
        dispatch(movieStateAction.restoreData([...movieState.data, ...newData]));
      });
    });
    movieStateAction.editPropertyStateByKey('isLoading', false);
  };
};

const movieBusinessAction = {
  firstSearchData,
  getFetchData,
  loadMoreData,
};

export default movieBusinessAction;
