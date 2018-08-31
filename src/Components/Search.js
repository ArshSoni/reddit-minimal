import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search" style={{ width: `100%` }}>
        <input {...this.props} />
      </div> 
    )
  }
}

Search.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

export default Search;