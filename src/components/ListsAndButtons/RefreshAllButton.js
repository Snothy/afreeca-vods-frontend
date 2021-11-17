import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import {errorHandler} from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';
import info from '../../config'

class RefreshAllButton extends React.Component {
  //old version - not used
    constructor(props) {
        super(props);
        this.state = {
            streamers: 0,
            refreshing: false,
            tip: 'Refresh All'
        }
    }

    static contextType = LoginContext;

    handleClickRefresh = () => {
        this.setState({refreshing: true});
        //this.state.tip = '...';
        this.setState({tip: '...'});

        const url = info.url+`streamers/refresh/all`;
        fetch(url, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            //this.state.tip = 'Refresh all';
            this.setState({tip:'Refresh all'});
            this.setState({refreshing: false});
            
            this.setState({streamers: data});
            this.props.onStatusChange(data);
        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);
            //error handling
        })
        
    }

    handleStatusChange = () => {
        //const is_live = this.state.is_live;

    }
    render() {
        let style;
        style = {position:"absolute", left:25,  marginTop:155};
        if(this.context.loggedIn === true) {
            style = {position:"absolute", left:25,  marginTop:108};
        }
        const tip = this.state.tip;
        return (
            <button type="button" 
            className={classNames("btn-basic blue1 ", { on: false })}
            tip={'Updates all streamer data'} 
            onClick={this.handleClickRefresh} 
            onChange={this.handleAllStatusChange}
            style = {style}>
                {!this.state.refreshing ? <span>{tip}</span>:
                <span>...</span>}
            </button>

        );
    }

}

//{on: true} is the click - use state for it
//style = {{marginTop: 145, paddingRight:20}}

export default RefreshAllButton; 