import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class VodItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vod: [],
      bj: []
    };
  }

  static propTypes = {
    vod: PropTypes.object,
    location: PropTypes.object
  }

  componentDidMount () {
    this.setState({ vod: this.props.vod });

    //  Saving the state in localStorage to allow for going back
    let routeState;
    // console.log(this.props);
    if (this.props.location.favourite) {
      localStorage.setItem('routeState', JSON.stringify(this.props.location.favourite.favourite));
      routeState = this.props.location.favourite.favourite;
    } else {
      routeState = localStorage.getItem('routeState');
      if (routeState) routeState = JSON.parse(routeState);
    }
    this.setState({ bj: routeState });
  }

  render () {
    // this.state.vod = this.props.vod;
    const vod = this.state.vod;
    // console.log(vod);
    // this.state.bj = this.props.location.query.favourite; // passed prop by through link @favouriteitem.js
    const bj = this.state.bj;

    /*
        //convert seconds to hh:mm:ss
        var date = new Date(null);
        date.setSeconds(vod.duration); // specify value for SECONDS here
        console.log(date);
        //var duration = date.toISOString().substr(11, 8);
        const duration = '';
        */

    let totalSeconds = vod.duration;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = String(minutes).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    const duration = hours + ':' + minutes + ':' + seconds;

    let reg_date = new Date(vod.date_released);
    reg_date = reg_date.toLocaleDateString();
    return (
            <>

            <div className="thumbs-box">
                <Link to={{ pathname: `/${bj.id}/${vod.title_num}`, query: { vod } }}>
                    <img src={vod.thumbnail} alt="" loading="lazy" />
                    <span className="time" >{duration}</span>
                </Link>

            </div>

            <div className="cBox-info">
                <a href="/#" className="thumb" target="_blank"><img src={bj.avatar_url} alt=""/></a>
                <h3>
                    <Link to={{ pathname: `/${bj.id}/${vod.title_num}`, query: { vod } }}>
                        {vod.title}
                    </Link>
                </h3>
                <div className="details">
                    <div className="nick_wrap">

                        <div className="nicknames">
                            <a href="/#">
                                <span>{bj.nick}</span>
                            </a>
                            </div>

                    </div>
                    <div className="info">
                        <span className="views">{vod.views}</span>
                        <span className="date">{reg_date}</span>

                    </div>
                </div>
            </div>

        </>
    );
  }
}

export default withRouter(VodItem);
