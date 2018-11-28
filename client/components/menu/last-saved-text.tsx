import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { prettyDate } from '../../tools/notebook-utils';

export class LastSavedTextUnconnected extends React.Component<any, any> {
  static propTypes = {
    lastSaved: PropTypes.string,
  }
  render() {
    return (
      <Typography
        classes={{ root: 'last-saved-text' }}
        style={{ marginRight: '10px' }}
      >
        {this.props.lastSaved === undefined ? ' ' : `saved ${prettyDate(this.props.lastSaved)}`}
      </Typography>)
  }
}

function mapStateToProps(state) {
  return {
    lastSaved: state.lastSaved,
  }
}

export default connect(mapStateToProps)(LastSavedTextUnconnected)
