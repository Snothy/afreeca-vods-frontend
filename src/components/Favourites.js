import React from 'react';
import FavouriteList from './ListsAndButtons/FavouriteList';
import { status, json } from '../utilities/requestHandlers';
import { errorHandler } from '../utilities/errorHandler';
import info from '../config';

class Favourites extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streamers: [],
      noneFound: false,
      mounted: false
    };
  }

  componentDidMount () {
    this.setState({ mounted: true });
    let url = info.url + 'streamers/';
    fetch(url, {
      method: 'GET',
      headers: {
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (this.state.mounted) {
          this.setState({ streamers: data });
        }
      })
      .catch(err => {
        const error = errorHandler(err);
        if (error[0] === false) {
          if (!this.state.mounted) {
            return;
          }
          this.setState({ noneFound: true });
        } else {
          // console.error(error);
        }
        // error handling
      });

    // cleaner way of updating live status than individual button presses
    url = info.url + 'streamers/refresh/all/fast';
    fetch(url, {
      method: 'GET',
      headers: {
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (this.state.mounted) {
          for (let i = 0; i < data.streamers.length; i++) {
            data.streamers[i].fetching = data.fetching[i].fetching;
          }
          this.setState({ streamers: data.streamers });
        }
      })
      .catch(err => {
        const error = errorHandler(err);
        console.log(error);
        // error handling
      });
  }

  handleAllStatusChange = (streamers) => {
    if (!this.state.mounted) {
      return;
    }
    this.setState({ streamers: streamers });
  }

  onRemove = (bj_id) => {
    if (!this.state.mounted) return;

    // Find streamer id, remove it & update state
    const streamers = this.state.streamers;
    for (let i = 0; i < streamers.length; i++) {
      if (streamers[i].id === bj_id) {
        streamers.splice(i, 1);
        break;
      }
    }
    this.setState({ streamers: streamers });

    if (this.state.streamers.length === 0) {
      this.setState({ noneFound: true });
    }
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    if (this.state.noneFound) {
      return (
          <div id="favorite_list" className="favor-wrap" style={{
            marginTop: -35, paddingLeft: 50
          }}>
              <h2 className='big h2'>None found</h2>
          </div>
      );
    }
    if (!this.state.streamers.length) {
      return (
            <>
            <h2 >Loading streamers..</h2>
            </>
      );
    }

    return (
            < >
                <FavouriteList streamers = {this.state.streamers} onStatusChange = {this.handleStatusChange} onRemove= {this.onRemove}/>
            </>
    );
  }
}

export default Favourites;
