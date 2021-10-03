import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Skeleton, List } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import ItemMovie from '../../components/itemMovie/ItemMovie';
import './Home.scss';
import HomeHeader from './HomeHeader';
import IState from '../../interfaces/IState';
import IMovieStateData from '../../interfaces/movie/IMovieStateData';
import movieBusinessActionImp from '../../stores/movie/movieBusinessAction';
import HookHelper from '../../helper/HookHelper';
import FormBusiness from '../../business/FormBusiness';

const { useScroll } = HookHelper;

const mapStateToProps = (state: IState) => {
  const movieState = state?.movieState?.toJS();
  return {
    search: movieState?.search,
    pageNumber: movieState?.pageNumber,
    isLoading: movieState?.isLoading,
    data: movieState?.data ?? [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    movieBusinessAction: bindActionCreators(movieBusinessActionImp, dispatch),
  };
};

interface IHome extends RouteComponentProps<any> {
  data?: IMovieStateData[],
  isLoading?: boolean,
  movieBusinessAction: typeof movieBusinessActionImp,
  pageNumber: number,
  search: string,
}

const Home: React.FC<IHome> = ({
  isLoading,
  data,
  movieBusinessAction,
  pageNumber,
  search,
  history,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const handleClickItem = (item: IMovieStateData) => {
    history.push(`/detail/${item?.imdbID}`);
  };

  useScroll(async (x, y, height) => {
    const itemLength = data?.length ?? 0;
    if (!isFetching) {
      FormBusiness.handleInfitiScroll(y, height, itemLength, async () => {
        setIsFetching(true);
        await movieBusinessAction.loadMoreData(search, pageNumber + 1);
        setIsFetching(false);
      });
    }
  }, document.body, [data, isFetching]);

  return (
    <Row
      gutter={20}
      style={{
        padding: '20px',
        width: '100%',
      }}
    >
      <HomeHeader />
      <Skeleton loading={isLoading}>
        <List
          id="list-movie"
          dataSource={data}
          renderItem={(item) => (
            <ItemMovie item={item} onClick={handleClickItem} />
          )}
          style={{
            width: '100%',
          }}
        />
      </Skeleton>
      {isFetching && <Skeleton loading />}
    </Row>
  );
};

Home.defaultProps = {
  data: undefined,
  isLoading: false,
  movieBusinessAction: undefined,
  pageNumber: 1,
  search: '',
  history: undefined,
};

Home.propTypes = {
  data: PropTypes.any,
  isLoading: PropTypes.any,
  movieBusinessAction: PropTypes.any,
  pageNumber: PropTypes.any,
  search: PropTypes.any,
  history: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));
