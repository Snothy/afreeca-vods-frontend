import VodItem from "./VodItem";
import React, {Fragment} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FetchXVodsButton from "./FetchXVodsButton"
import { withRouter } from "react-router";


class VodList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vods: [],
            num_vods: 0,
            updated:false,
            noneFound: false
        }
    }

    componentDidMount() {
        //this.state.vods = this.props.vods;
    }
    componentDidUpdate() {
        if(this.state.vods.length<this.props.vods.length) {
            this.setState({vods: this.props.vods});
        }
        if(this.state.noneFound !== this.props.noneFound) {
          this.setState({noneFound: this.props.noneFound});
        }
    }

    handleStatusChange = (vod) => {
        //this.setState({bj: bj});
        //console.log(bj);
        this.props.onStatusChange(vod);
    }

    handleFetchVods =(vods) => {
        //this.setState({vods: vods});
        for(let i=0; i<vods.length; i++) {
            this.state.vods.push(vods[i]);
        }
        this.setState({updated: true});
        this.props.onFetchVods(vods);
        this.setState({noneFound: false});
    }


    render() {
        const vods = this.state.vods;
        const bj_id = this.props.match.params.id;
        if (this.state.noneFound === true) {
          return(
            <>
            <FetchXVodsButton num_vods = {this.state.num_vods} bj_id ={bj_id} streamers= {this.state.streamers} onStatusChange={this.handleFetchVods}  className="btn-fav" />
            <h2>No vods found</h2>
            </>
          )
        }


        if (this.props.vods.length > 0 || this.state.vods.length > 0) {
            return (
                <>

                <FetchXVodsButton num_vods = {this.state.num_vods} bj_id ={bj_id} streamers= {this.state.streamers} onStatusChange={this.handleFetchVods}  className="btn-fav" />
                <Fragment>
                
                <div style={{
                    marginTop: -20, paddingLeft:10
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
                        pagination={{"clickable": true}} 
                        allowTouchMove={true}
                    >
                        {vods.map((vod, index) => {
                            return (
                                <SwiperSlide tag="li" key={index} data-type="cBox" style={{}}>
                                    <VodItem vod={vod} onStatusChange={this.handleStatusChange}/>
                                </SwiperSlide>
                                );
                        })}
                    </Swiper>
                </div>

                </div>
                </Fragment>
                </>
            )
        } else {
            //console.log('a');
            return(
                <>
                <FetchXVodsButton num_vods = {this.state.num_vods} bj_id ={bj_id} streamers= {this.state.streamers} onStatusChange={this.handleFetchVods}  className="btn-fav" />
                <h2>Loading vods..</h2>
                </>
            )
        }
    }


    
}

export default withRouter(VodList);




/*

                <div className="slide-vod">
                    {(vods.length > 6) && <SwiperController swiperRef={this.state.ref} autoplay={false} />}

                    <Swiper
                        ref={this.state.ref}
                        autoplay={false}
                        wrapperTag="ul"
                        spaceBetween={19}
                        slidesPerView={100}
                        allowTouchMove={false}
                        loop={vods.length > 4}
                    >
                        {vods.map((vod, index) => {
                            return (
                                <SwiperSlide tag="li" key={index} data-type="cBox">
                                    <VodItem vod={vod} onStatusChange={this.handleStatusChange}/>
                                </SwiperSlide>
                                );
                        })}
                    </Swiper>
                </div>

*/


















/*
                                <SwiperSlide tag="li" key={index} data-type="cBox">
                                    <VodItem vod={vod} onStatusChange={this.handleStatusChange}/>
                                </SwiperSlide>
*/