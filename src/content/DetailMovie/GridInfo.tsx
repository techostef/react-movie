import React from 'react';
import PropTypes from 'prop-types';

interface IGridInfo {
  label: string,
  value?: string,
}

const GridInfo: React.FC<IGridInfo> = ({
  label,
  value,
}) => {
  return (
    <>
      <div className="label">{label}</div>
      <div className="info">
              :
        <span style={{ marginLeft: '10px' }}>
          {value}
        </span>
      </div>
    </>
  );
};

GridInfo.defaultProps = {
  label: '',
  value: '',
};

GridInfo.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
};

export default React.memo(GridInfo);
