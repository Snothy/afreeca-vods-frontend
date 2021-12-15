import React from 'react';
import { withRouter } from 'react-router';
import { status, json } from '../utilities/requestHandlers';
import ReactPlayer from 'react-player';
import info from '../config';
import LoginContext from '../contexts/login';
import Chat from './Chat';
import PropTypes from 'prop-types';

class Live extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playing: true,
      data: null,
      mounted: false
    };
  }

  static propTypes = {
    match: PropTypes.object
  }

  static contextType = LoginContext;

  componentDidMount () {
    this.setState({ mounted: true });
    let cookie = this.context.cookie;
    cookie = { cookie: cookie };
    const url = info.url + `streamers/${this.props.match.params.id}/live`;
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
        if (this.state.mounted) {
          this.setState({ data: data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    // const url = info.url + 'proxy/';
    if (this.state.data === null) {
      return (
        <p>Loading stream data</p>
      );
    }
    if (!this.state.data.live) {
      return (
        <p>Not live or 19+. Please log in and try again.</p>
      );
    }
    return (

          <>
          <div style={{
            paddingLeft: 10,
            paddingTop: 20,
            height: '1000px'
          }}>

          <p style={{
            width: '40%',
            marginRight: '0'
          }}> {this.state.data.title} </p>
          <ReactPlayer
          url={info.url + 'proxy/' + this.state.data.live_url}
          config={{
            file: {
              hlsOptions: {
                initialLiveManifestSize: 4,
                liveSyncDurationCount: 4,
                nudgeMaxRetry: 10,
                manifestLoadingMaxRetry: 5,
                xhrSetup: function (xhr, url) {
                  // Need to use proxy to fetch the playlist
                  // if (url.includes('?')) return;
                  // Fetching the segment URL from afreeca is much faster
                  // Also blocked by CORS, so still needs a proxy
                  // url = url.split('/');
                  // url = url.splice(5).join('/');
                  // xhr.open('GET', url, true);
                }
              }
            }
          }}
          playing={this.state.playing}
          controls={true}
          width="73%"
          height="73%"
          style={{
            float: 'left'
          }}
          />

          <Chat style={{
          }}
          data={this.state.data}/>
          </div>

          </>
    );
  }
}

export default withRouter(Live);
