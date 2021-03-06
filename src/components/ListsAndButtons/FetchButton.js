import React from 'react';
import classNames from 'classnames';
import { status, json } from '../../utilities/requestHandlers';
import { errorHandler } from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';
import info from '../../config';
import PropTypes from 'prop-types';

class FetchButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fetchingList: [],
      fetching: false,
      mounted: false,
      refreshed: false
    };
  }

  static propTypes = {
    favourite: PropTypes.object,
    fetching: PropTypes.bool,
    refreshed: PropTypes.bool,
    onFetch: PropTypes.func
  }

  static contextType = LoginContext;

  onClickFetch = (e) => {
    e.preventDefault();
    if (!this.state.mounted) return;
    if (!this.context.loggedIn) {
      alert('You need to log in to use fetch');
      return;
    }
    if (!this.props.refreshed) {
      alert('Wait for update of streamers');
      return;
    }
    this.setState({ fetching: true });
    this.props.onFetch(true);
    let cookie = this.context.cookie;
    cookie = { cookie: cookie };

    const url = info.url + `streamers/${this.props.favourite.id}/fetch`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(cookie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (!this.state.mounted) return;
        // if fetch was successful (completed)
        if (data.success) {
          alert(data.message);
          // if fetch hasnt completed (yet)
        } else if (!data.success) {
          // if still fetching
          if (data.fetching) {
            alert(data.message);
            return;
          } else {
            alert(data.message);
          }
        }
        this.setState({ fetching: false });
      })
      .catch(err => {
        const error = errorHandler(err);
        console.log(error);
      });
  }

  componentDidMount () {
    this.setState({ mounted: true });
    this.setState({ fetching: false });
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.state.mounted) return;
    if (prevProps !== this.props) {
      this.setState({ fetching: this.props.fetching });
      this.setState({ refreshed: this.props.refreshed });
    }
  }

  render () {
    return (
          <button type="button"
          className={classNames('btn-basic blue1', { on: false })}
          tip={'Listen for new VOD and add it'}
          onClick={this.onClickFetch}
          style = {{ position: 'relative', left: 1, float: 'left', zIndex: 1 }}>
              {!this.state.fetching
                ? <span>{'Fetch'}</span>
                : <span>...</span>}
          </button>
    );
  }
}

export default FetchButton;
