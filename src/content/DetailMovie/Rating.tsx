import { Rate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

interface IRating {
  useSeperator: boolean,
  source: string,
  rating: any,
}

const Rating: React.FC<IRating> = ({
  useSeperator,
  source,
  rating,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        lineHeight: '21px',
      }}
    >
      {useSeperator ? (
        <div
          style={{
            width: '1px',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          |
        </div>
      ) : ''}
      {source}
      <Rate
        style={{
          marginLeft: '5px',
          marginTop: '-1px',
        }}
        allowHalf
        disabled
        value={Number(rating)}
      />
    </div>
  );
};

Rating.defaultProps = {
  useSeperator: undefined,
  rating: undefined,
  source: undefined,
};

Rating.propTypes = {
  useSeperator: PropTypes.any,
  rating: PropTypes.any,
  source: PropTypes.any,
};

export default React.memo(Rating);
