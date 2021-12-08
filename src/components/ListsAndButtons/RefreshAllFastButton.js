import React from 'react';
import classNames from 'classnames';
import { status, json } from '../../utilities/requestHandlers';
import { errorHandler } from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';
import info from '../../config';
import PropTypes from 'prop-types';

class RefreshAllFastButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streamers: 0,
      refreshing: false,
      tip: 'Update Live'
    };
  }

  static propTypes = {
    onStatusChange: PropTypes.func
  }

  static contextType = LoginContext;

  handleClickRefresh = () => {
    this.setState({ refreshing: true });
    // this.state.tip = '...';
    this.setState({ tip: '...' });

    const url = info.url + 'streamers/refresh/all/fast';
    fetch(url, {
      method: 'GET',
      headers: {
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        // this.state.tip = 'Update Live';
        this.setState({ tip: 'Update Live' });
        this.setState({ refreshing: false });

        this.setState({ streamers: data });
        this.props.onStatusChange(data);
      })
      .catch(err => {
        const error = errorHandler(err);
        console.log(error);
        // error handling
      });
  }

  handleStatusChange = () => {
    // const is_live = this.state.is_live;

  }

  render () {
    let style;
    style = { position: 'absolute', left: 25, marginTop: 155 };
    if (this.context.loggedIn === true) {
      style = { position: 'absolute', left: 25, marginTop: 108 };
    }
    const tip = this.state.tip;
    return (
          <button type="button"
          className={classNames('btn-basic blue1 ', { on: false })}
          tip={'Updates live status for all'}
          onClick={this.handleClickRefresh}
          onChange={this.handleAllStatusChange}
          style = {style}>
              {!this.state.refreshing
                ? <span>{tip}</span>
                : <span>...</span>}
          </button>

    );
  }
}

// {on: true} is the click - use state for it
// style = {{marginTop: 145, paddingRight:20}}

export default RefreshAllFastButton;
