import React from 'react';
//import RefreshAllButton from "./ListsAndButtons/RefreshAllButton"
import RefreshAllFastButton from "./ListsAndButtons/RefreshAllFastButton"
import FavouriteList from './ListsAndButtons/FavouriteList';
import { status, json } from '../utilities/requestHandlers';
import {errorHandler} from '../utilities/errorHandler';

class Streamers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamers: [],
            updated: false,
            updatedList: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/streamers/', {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            this.setState({streamers: data});
        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);
            //error handling
        })
    }

    handleAllStatusChange = (streamers) => {
        //this.setState({bj: bj});

        //this.state.updatedList = streamers;
        //this.state.streamers = streamers;
        this.setState({updatedList: streamers});
        this.setState({streamers: streamers});
        //console.log(this.state.updatedList);
        this.setState({updated: true});
    }


    
    handleStatusChange = (bj) => {
        //this.setState({bj: bj});
        //console.log(bj);
        for(let i=0; i<this.state.streamers.length; i++) {
            if(this.state.streamers[i].id === bj[0].id) {
                //this.state.updatedList = this.state.streamers;
                //this.state.updatedList[i] = bj[0];
                let streamers = this.state.streamers;
                this.setState({updatedList:streamers});
                streamers[i] = bj[0];
                this.setState({updatedList: streamers});

                //console.log(this.state.updatedList);
                //console.log(this.state.updated);
                this.setState({updated: true});
            }
        }
    }
    onRemove = (bj_id) => {
        //console.log(this.state.streamers);
        for(let i=0; i<this.state.streamers.length; i++) {
            //console.log(this.state.streamers[i]);
            if (this.state.streamers[i].id === bj_id) {
                this.state.streamers.splice(i, 1);
                this.setState({updated: true});
                //console.log('a');
                //console.log(this.state.streamers);
                break;
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.updated !== this.state.updated) {
            //this.state.streamers = this.state.updatedList;
            this.setState({updated:false});
            this.setState({updatedList: []});
        }
        //refresh all case
        //
      }

    render() {
        if (!this.state.streamers.length) {
            <>
            <h2 >Loading streamers..</h2>
            </>
        }

        return (
            < >
                <RefreshAllFastButton streamers= {this.state.streamers} onStatusChange={this.handleAllStatusChange}  className="btn-fav" />
                {!this.state.updated ?<FavouriteList streamers = {this.state.streamers} onStatusChange = {this.handleStatusChange} onRemove= {this.onRemove}/>:
                <FavouriteList streamers = {this.state.updatedList} onStatusChange = {this.handleStatusChange} onRemove= {this.onRemove}/>}
                
            </>
        )
    }
}

//<RefreshAllButton streamers= {this.state.streamers} onStatusChange={this.handleAllStatusChange}  className="btn-fav" />      


export default Streamers;