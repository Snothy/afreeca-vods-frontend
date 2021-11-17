import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import {errorHandler} from '../../utilities/errorHandler';
import info from '../../config';

class RefreshIdButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bj: 0,
            refreshing: false,
            tip: 'Refresh'
        }
    }

    handleClickRefresh = (e) => {
        e.preventDefault();
        this.setState({refreshing: true});
        //this.state.tip = '...';
        this.setState({tip: '...'});
        //console.log(this.props.bj_id);

        const url = info.config.url+`streamers/refresh/${this.props.bj_id}`;
        fetch(url, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
          //console.log(data[0].last_live);
            //this.state.tip = 'Refresh';
            this.setState({tip: 'Refresh'});
            this.setState({refreshing: false});

            //data[0].is_live = Number(data[0].is_live);
            this.setState({bj: data});
            this.props.onStatusChange(data);
        })
        .catch(err => {
            errorHandler(err);
            //const error = errorHandler(err);
            //console.log(error);
            //error handling
        })
        
    }

    handleStatusChange = () => {
      //const is_live = this.state.is_live;
    }

    render() {
        const tip = this.state.tip;
        return (
            <button type="button" 
            className={classNames("btn-basic blue1 ", { on: false })}
            tip={'Refresh streamer data'} 
            onClick={this.handleClickRefresh} 
            onChange={this.handleStatusChange}
            style = {{position:"relative", left:1, float: 'right'}}>
                {!this.state.refreshing ? <span>{tip}</span>:
                <span>...</span>}
            </button>
        );
    }

}

//{on: true} is the click - use state for it
//style = {{marginTop: 145, paddingRight:20}}

export default RefreshIdButton;