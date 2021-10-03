import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, AutoComplete } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import movieBusinessActionImp from '../../stores/movie/movieBusinessAction';
import MovieBusiness from '../../business/MovieBusiness';
import FormBusiness from '../../business/FormBusiness';

const mapDispatchToProps = (dispatch) => {
  return {
    movieBusinessAction: bindActionCreators(movieBusinessActionImp, dispatch),
  };
};

interface IHomeHeader {
  movieBusinessAction: typeof movieBusinessActionImp,
}

const HomeHeader: React.FC<IHomeHeader> = ({
  movieBusinessAction,
}) => {
  const [options, setOptions] = useState<any[]>([]);

  const onSelect = () => {

  };

  const onSearch = () => {

  };

  const onkeyup = async (e: any) => {
    if (e.keyCode === 13) {
      await movieBusinessAction.firstSearchData({
        s: e.target.value ?? '',
      });
      return;
    }
    // -----------------------------------------------------
    FormBusiness.handleStopTyping(async () => {
      const title = e?.target?.value ?? '';
      const listTitle = await MovieBusiness.getListTitleMovie(title);
      setOptions(listTitle);
    });
  };

  return (
    <PageHeader
      className="site-page-header"
      subTitle={(
        <AutoComplete
          data-testid="autocomplate-searchbox"
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={onSearch}
          onKeyUp={onkeyup}
          placeholder="input here"
        />
      )}
      title="Movie"
    />
  );
};

HomeHeader.defaultProps = {
  movieBusinessAction: undefined,
};

HomeHeader.propTypes = {
  movieBusinessAction: PropTypes.any,
};

export default connect(null, mapDispatchToProps)(React.memo(HomeHeader));
