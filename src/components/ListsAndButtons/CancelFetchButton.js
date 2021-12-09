import React from 'react';
import classNames from 'classnames';
import { status, json } from '../../utilities/requestHandlers';
import { errorHandler } from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';
import info from '../../config';
import PropTypes from 'prop-types';

class CancelFetchButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cancelled: false,
      mounted: false,
      refreshed: false
    };
  }

  static propTypes = {
    favourite: PropTypes.object,
    cancelled: PropTypes.bool,
    refreshed: PropTypes.bool,
    onCancelFetch: PropTypes.func
  }

  static contextType = LoginContext;

  onClickFetch = (e) => {
    e.preventDefault();
    if (!this.state.mounted) return;
    if (!this.context.loggedIn) {
      alert('You need to log to cancel a fetch');
      return;
    }
    if (!this.props.refreshed) {
      alert('Wait for update of streamers');
      return;
    }
    this.setState({ cancelled: true });

    const url = info.url + `streamers/${this.props.favourite.id}/cancelFetch`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (!this.state.mounted) return;
        // if fetch was cancelled
        if (data.success) {
          alert(data.message);
          this.props.onCancelFetch();
        // if fetch couldnt be cancelled
        } else {
          alert(data.message);
        }
        this.setState({ cancelled: false });
      })
      .catch(err => {
        const error = errorHandler(err);
        console.log(error);
      });
  }

  componentDidMount () {
    this.setState({ mounted: true });
    this.setState({ cancelled: false });
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.state.mounted) return;
    if (prevProps !== this.props) {
      this.setState({ cancelled: this.props.favourite.cancelled });
      this.setState({ refreshed: this.props.refreshed });
    }
  }

  render () {
    return (
          <button type="button"
          className={classNames('btn-basic blue1', { on: false })}
          tip={'Cancel Fetch'}
          onClick={this.onClickFetch}
          style = {{ position: 'relative', left: 1, float: 'right', zIndex: 1 }}>
              {!this.state.cancelled
                ? <span>{'Cancel'}</span>
                : <span>...</span>}
          </button>
    );
  }
}

export default CancelFetchButton;
