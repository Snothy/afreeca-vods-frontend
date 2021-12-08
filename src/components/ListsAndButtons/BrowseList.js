import BrowseItem from './BrowseItem';
import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class BrowseList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      streamers: [],
      mounted: false
    };
  }

  static propTypes = {
    streamers: PropTypes.arrayOf(PropTypes.object),
    onGetMore: PropTypes.func
  }

  componentDidMount () {
    this.setState({ mounted: true });
  }

  componentDidUpdate () {
    /*
        if(!this.state.mounted) return;

        if(this.state.streamers.length<this.props.streamers.length) {
            this.setState({streamers: this.props.streamers});
        }
        */
  }

  handleGetMore = () => {
    this.props.onGetMore(true);
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    const streamers = this.props.streamers;

    return (
          <>

          <Fragment>

          <div style={{
            marginTop: -20, paddingLeft: 10
          }}>

          <div className="title-wrap h2" >
              <h2 className='big h2' >All</h2>
          </div >

          <div className="slide-vod">

              <Swiper
                  autoplay={false}
                  wrapperTag="ul"
                  spaceBetween={0}
                  slidesPerView={6}
                  slidesPerColumn={900}
                  slidesPerGroup={3}
                  slidesPerColumnFill="row"
                  pagination={{ clickable: true }}
                  allowTouchMove={false}
              >
                  {streamers.map((streamer, index) => {
                    return (
                          <SwiperSlide tag="li" key={index} data-type="cBox" style={{}}>
                              <BrowseItem streamer={streamer} />
                          </SwiperSlide>
                    );
                  })}
              </Swiper>
          </div>

          </div>
          </Fragment>
          <div className="btn-more">
          <button
          type="button"
          className="btn-basic blue1"
          onClick={this.handleGetMore}
          style={{
            marginBottom: '30px',
            width: '70%',
            marginRight: '21%'
          }}
          >
          <span>Show more</span>
          </button>
          </div>
          </>
    );
  }
}

export default withRouter(BrowseList);
