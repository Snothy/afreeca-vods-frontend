import FavouriteItem from './FavouriteItem';
import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

class FavouriteList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mounted: false,
      refreshed: false
    };
  }

  static propTypes = {
    streamers: PropTypes.arrayOf(PropTypes.object),
    refreshed: PropTypes.bool,
    onStatusChange: PropTypes.func,
    onRemove: PropTypes.func
  }

  componentDidMount () {
    this.setState({ mounted: true });
  }

  onRemove = (bj_id) => {
    if (!this.state.mounted) return;
    this.props.onRemove(bj_id);
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    if (this.props.streamers.length > 0) {
      return (
        <div id="favorite_list" className="favor-wrap" style={{
          marginTop: -35, paddingLeft: 50
        }}>
        {!this.props.refreshed
          ? <>
          <Spin style = {{ position: 'absolute', left: 150, marginTop: 170 }}/>
          </>
          : null}
        <div className="favor-list">

        <h2 className='big.h2'>LIVE</h2>
            <ul>
              {this.props.streamers.filter(streamer => streamer.is_live).map(streamer => {
                return (
                  <li key={streamer.id}>
                    <FavouriteItem refreshed = {this.props.refreshed} favourite={streamer} onStatusChange={this.handleStatusChange} onRemove ={this.onRemove}/>
                  </li>
                );
              })}
            </ul>

        <h2 className='big.h2'>OFFLINE</h2>
            <ul>
            {this.props.streamers.filter(streamer => !streamer.is_live).map(streamer => {
              return (
                  <li key={streamer.id}>
                    <FavouriteItem refreshed = {this.props.refreshed} favourite={streamer} onRemove ={this.onRemove}/>
                  </li>
              );
            })}
            </ul>

        </div>
        </div>
      );
    } else {
      return (
                <>
                </>
      );
    }
  }
}

export default FavouriteList;
