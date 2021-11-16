import React from 'react';
import { withRouter } from "react-router";
import { status, json } from '../utilities/requestHandlers';
import {errorHandler} from '../utilities/errorHandler';
import ReactPlayer from 'react-player';
import VodButton from './ListsAndButtons/vodButton';


class Vod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vod: [],
            url: '',
            playing: true
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const vodId = this.props.match.params.vodId;
        fetch(`http://localhost:3001/api/streamers/${id}/${vodId}`, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(data.length === undefined) {
                data = [data];
            }
            this.setState({vod: data});
            this.setState({url: data[0].vod_link});
        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);
            //error handling
        })
    }


    changeSrc = (url) => {
        //const newVod = this.state.vod[1].vod_link;
        this.setState({url: url});
    }



    render() {
        if (!this.state.vod.length) {
            return(
                <>
                <h2>Loading vod..</h2>
                </>
            )

        }
        //console.log(this.state.vod);
        
        let vodLinks = [];
        for(let i=0; i<this.state.vod.length; i++) {
            vodLinks.push(this.state.vod[i].vod_link);
        }
        //console.log(vodLinks);
        //this.state.currentSegment = vodLinks[0];
        //const currSegment = vodLinks[0];
        //this.setState({currentSegment: currSegment});
        return (
            
            <>
            <div style={{
                paddingLeft: 10,
                paddingTop: 20,
                height: 1000
            }}>

                <ReactPlayer 
            url={this.state.url}
            playing={this.state.playing}
            controls={true}
            style={{
                float:'left'
            }}
            />

            <VodButton vod={this.state.vod} onStatusChange={this.changeSrc}/>
            </div>


            </>
        );
    }
}

export default withRouter(Vod);
