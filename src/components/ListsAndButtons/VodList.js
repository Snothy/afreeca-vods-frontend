import VodItem from './VodItem';
import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import FetchXVodsButton from './FetchXVodsButton';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class VodList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vods: [],
      noneFound: true,
      mounted: false
    };
  }

  static propTypes = {
    noneFound: PropTypes.bool,
    vods: PropTypes.arrayOf(PropTypes.object),
    handleFetchVods: PropTypes.func,
    match: PropTypes.object
  }

  componentDidMount () {
    this.setState({ mounted: true });
  }

  componentDidUpdate () {
    if (!this.state.mounted) return;

    if (this.state.vods.length < this.props.vods.length) {
      this.setState({ vods: this.props.vods });
    }

    if (this.state.noneFound !== this.props.noneFound) {
      this.setState({ noneFound: this.props.noneFound });
    }
  }

  handleFetchVods = (vods) => {
    if (!this.state.mounted) return;
    this.props.handleFetchVods(vods);
  }

  componentWillUnmount () {
    this.setState({ mounted: false });
  }

  render () {
    if (this.props.vods == null) {
      return (
          <>
            <h2>Loading vods..</h2>
          </>
      );
    }
    // const bj_id = this.props.match.params.id;
    if (this.state.noneFound === true) {
      return (
          <>
          <h2>No vods found</h2>
          </>
      );
    }

    const vods = this.props.vods;
    if (this.props.vods.length > 0) {
      return (
              <>
              <Fragment>

              <div style={{
                marginTop: -20, paddingLeft: 10
              }}>

              <div className="title-wrap h2" >
                  <h2 className='big h2' >Vods</h2>
              </div >

              <div className="slide-vod">
                  <Swiper
                      autoplay={false}
                      wrapperTag="ul"
                      spaceBetween={0}
                      slidesPerView={6}
                      slidesPerColumn={20}
                      slidesPerGroup={3}
                      slidesPerColumnFill="row"
                      pagination={{ clickable: true }}
                      allowTouchMove={false}
                  >
                      {vods.map((vod) => {
                        return (
                              <SwiperSlide tag="li" key={vod.title_num} data-type="cBox" style={{}}>
                                  <VodItem vod={vod} />
                              </SwiperSlide>
                        );
                      })}
                  </Swiper>
              </div>
              </div>
              </Fragment>
              </>
      );
    } else {
      return (
              <>
              <h2>Loading vods..</h2>
              </>
      );
    }
  }
}
// <FetchXVodsButton bj_id ={bj_id} handleFetchVods={this.handleFetchVods} className="btn-fav" />
export default withRouter(VodList);
