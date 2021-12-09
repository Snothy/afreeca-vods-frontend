import FetchButton from './FetchButton';
import CancelFetchButton from './CancelFetchButton';
import FavouriteRemoveButton from './FavouriteRemoveButton';
import React from 'react';
import fromNow from 'fromnow';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class FavouriteItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streamImg: '',
      hovering: 'none',
      mounted: false,
      fetching: false,
      refreshed: false
    };
    this.myRef = React.createRef();
  }

  static propTypes = {
    favourite: PropTypes.object,
    refreshed: PropTypes.bool,
    onStatusChange: PropTypes.func,
    onRemove: PropTypes.func
  }

  componentDidMount () {
    this.setState({ mounted: true });
  }

  // Showing or removing image on hover
  handleLeave = () => {
    if (!this.state.mounted) return;
    this.setState({ hovering: 'none' });
  }

  handleHover = () => {
    if (!this.state.mounted) return;
    this.setState({ hovering: 'block' });
  }

  onRemove = (bj_id) => {
    if (!this.state.mounted) return;
    this.props.onRemove(bj_id);
  }

  handleFetch = (value) => {
    if (!this.state.mounted) return;
    this.setState({ fetching: value });
  }

  handleCancelFetch = () => {
    if (!this.state.mounted) return;
    this.setState({ fetching: false });
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.state.mounted) return;
    if (prevProps !== this.props) {
      this.setState({ fetching: this.props.favourite.fetching });
    }
    if (this.props.favourite.is_live && this.props.refreshed !== this.state.refreshed) {
      this.setState({ refreshed: this.props.refreshed });
    }
  }

  render () {
    const image = new Image();

    if (this.props.favourite.streamImg) {
      image.src = this.props.favourite.streamImg;
    } else {
      image.src = 'https://cdn.dribbble.com/users/902865/screenshots/4814970/loading-opaque.gif';
    }
    const favourite = this.props.favourite;
    const last_live_date = new Date(favourite.last_live);
    const last_live = fromNow(last_live_date, { max: 1, suffix: true });
    const live_for = fromNow(last_live_date, { max: 2 });

    return (
          <>
          <Link style={{ minHeight: '0' }} to={{ pathname: `/${favourite.id}/`, favourite: { favourite } }} className="wrap">
          <FavouriteRemoveButton bj_id= {favourite.id} onRemove={this.onRemove} className="btn-fav" />
          <div className="thumb" style={{ backgroundImage: `url(${favourite.avatar_url})` }}></div>
          <div className="nick"><strong>{`${favourite.nick}`}</strong></div>
          <span className="id">{favourite.id}</span>

          </Link>

          {!favourite.is_live
            ? <Link style={{ minHeight: '0', paddingTop: '0' }} to={{ pathname: `/${favourite.id}/`, favourite: { favourite } }} className="wrap">
            <span className="last_live">
            <em style={{ color: 'grey' }}>
                Recent Streams
                <em> {last_live} </em>
            </em>
            </span>
            </Link>
            : <>
            <Link style={{ minHeight: '0', maxWidth: '30px' }} to={{ pathname: `/${favourite.id}/live`, favourite: { favourite } }}>
              <span className="last_live">
                <div className="btns" >
                  <div href="/#" className="live" onMouseOver={this.handleHover} onMouseLeave={this.handleLeave}>LIVE</div>

                  <img src={image.src} alt="thumb" style={{
                    position: 'absolute',
                    display: this.state.hovering,
                    zIndex: 5
                  }}/>

                </div>
              </span>
            </Link>

            <Link style={{ minHeight: '0', paddingTop: '0' }} to={{ pathname: `/${favourite.id}/`, favourite: { favourite } }} className="wrap">
              <p style={{ paddingTop: 30, textAlign: 'center', color: 'black', marginTop: -5, fontSize: 13 }}> {live_for} </p>
            </Link>
          </>}

          {favourite.is_live
            ? <>
          <FetchButton refreshed = {this.state.refreshed} onFetch={this.handleFetch}
          fetching={this.state.fetching} favourite={favourite} className="btn-fav"/>
          <CancelFetchButton refreshed = {this.state.refreshed} onCancelFetch={this.handleCancelFetch}
            favourite={favourite} className="btn-fav" />
            </>
            : null}
          </>
    );
  }
}

export default FavouriteItem;
