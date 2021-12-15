import React from 'react';
import classNames from 'classnames';
import { status, json } from '../../utilities/requestHandlers';
import LoginContext from '../../contexts/login';
import info from '../../config';
import PropTypes from 'prop-types';
class FetchXVodsButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vods: 0,
      refreshing: false,
      tip: 'Fetch vods',
      mounted: false
    };
  }

  static propTypes = {
    bj_id: PropTypes.string,
    handleFetchVods: PropTypes.func
  }

  static contextType = LoginContext;

  componentDidMount () {
    this.setState({ mounted: true });
  }

  handleFetchVods = (e) => {
    e.preventDefault();
    this.setState({ refreshing: true });
    this.setState({ tip: '...' });
    const cookie = this.context.cookie;
    const body = {
      cookie: cookie,
      num: 40 // hardcoded for now, user input later
    };

    const url = info.url + `streamers/${this.props.bj_id}/fetchVodsDb`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (!this.state.mounted) return;
        this.setState({ tip: 'Fetch vods' });
        this.setState({ refreshing: false });

        // if successful pass vods data onto parent component (vods.js) for real-time state update
        if (data.success) {
          this.props.handleFetchVods(data.vods);
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        if (!this.state.mounted) return;
        this.setState({ tip: 'Fetch vods' });
        this.setState({ refreshing: false });
        // error handling
      });
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    let style;
    style = { position: 'absolute', left: 25, marginTop: 202 };
    if (this.context.loggedIn === true) {
      style = { position: 'absolute', left: 25, marginTop: 155 };
    }
    const tip = this.state.tip;
    return (
          <button type="button"
          className={classNames('btn-basic blue1 ', { on: false })}
          tip={'Get all available VODs'}
          onClick={this.handleFetchVods}
          style = {style}>
              {!this.state.refreshing
                ? <span>{tip}</span>
                : <span>...</span>}
          </button>
    );
  }
}

export default FetchXVodsButton;
