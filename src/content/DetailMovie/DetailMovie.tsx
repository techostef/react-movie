import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Skeleton } from 'antd';
import './DetailMovie.scss';
import IMovieDetail from '../../interfaces/movie/IMovieDetail';
import MovieBusiness from '../../business/MovieBusiness';
import Rating from './Rating';
import GridInfo from './GridInfo';

type PathParamsType = {
  id: string,
}

type IDetailMovie = RouteComponentProps<PathParamsType> & {
  id: string,
}

const DetailMovie: React.FC<IDetailMovie> = ({
  match,
}) => {
  const [detailItem, setDetailItem] = useState<(IMovieDetail) | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const result: IMovieDetail = await MovieBusiness.getInfoDetailMovie(match?.params?.id);
      if (result) {
        setDetailItem(result);
      }
      setIsFetching(false);
    })();
  }, []);

  return (
    <div className="detail-movie">
      <div className="content-movie">
        <Skeleton loading={isFetching}>
          <Image
            width={300}
            src={detailItem?.Poster}
          />
        </Skeleton>
        <Skeleton loading={isFetching}>
          <div className="info-movie">
            <h1>
              {detailItem?.Title}
              <span className="year">
            (
                {detailItem?.Year}
            )
              </span>
            </h1>
            <div className="content-info-genre">
            Genre -
              {' '}
              <span
                className="genre-text"
              >
                {detailItem?.Genre}
              </span>
              {' '}
            |
            Released:
              <span style={{ fontWeight: 700 }}>
                {` ${detailItem?.Released}`}
              </span>
              {' '}
            |
            Run Time:
              <span style={{ fontWeight: 700 }}>
                {` ${detailItem?.Runtime}`}
              </span>
            </div>
            <div className="content-info-rating">
              {detailItem?.Ratings.map((itemRating, i) => {
                const inMiddle = i === detailItem?.Ratings?.length - 1;
                const rating = MovieBusiness.getRatingToNumber(itemRating?.Value);
                return (
                  <>
                    <Rating
                      useSeperator={inMiddle}
                      source={itemRating?.Source}
                      rating={rating}
                    />
                  </>
                );
              })}
            </div>
            <div className="content-info-movie">
              {detailItem?.Plot}
            </div>
            <div className="content-info-movie grid">
              <GridInfo
                label="Director"
                value={detailItem?.Director}
              />
              <GridInfo
                label="Writer"
                value={detailItem?.Writer}
              />
              <GridInfo
                label="Actors"
                value={detailItem?.Actors}
              />
              <GridInfo
                label="Language"
                value={detailItem?.Language}
              />
              <GridInfo
                label="Country"
                value={detailItem?.Country}
              />
              <GridInfo
                label="Awards"
                value={detailItem?.Awards}
              />
              <GridInfo
                label="Metascore"
                value={detailItem?.Metascore}
              />
              <GridInfo
                label="DVD"
                value={detailItem?.DVD}
              />
              <GridInfo
                label="BoxOffice"
                value={detailItem?.BoxOffice}
              />
              <GridInfo
                label="Production"
                value={detailItem?.Production}
              />
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

DetailMovie.propTypes = {
  match: PropTypes.any,
};

DetailMovie.defaultProps = {
  match: undefined,
};

export default React.memo(DetailMovie);
