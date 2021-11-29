import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import {errorHandler} from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';
import info from '../../config';

class FetchButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchingList: [],
            fetching: false,
            tip: 'Fetch',
            mounted: false
        }
    }

    static contextType = LoginContext;

    onClickFetch = (e) =>{
        e.preventDefault();
        if(!this.state.mounted) return;
        this.setState({fetching: true});
        this.setState({tip:'...'});
        let cookie = this.context.cookie;
        cookie = {cookie: cookie};
        
        const url = info.url+`streamers/${this.props.favourite.id}/fetch`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(cookie),
            headers: {
                "Content-Type": "application/json", 
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(!this.state.mounted) return;
            //if fetch was successful (completed)
            if(data.success) {
              alert(data.message);
            //if fetch hasnt completed (yet)
            } else if(!data.success) {
              //if still fetching
              if(data.fetching) {
                alert(data.message);
                return;
              } else {
                alert(data.message);
              }
            }
            this.setState({fetching: false});
            this.setState({tip:'Fetch'});
        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);
        })
    }

    componentDidMount() {
      this.setState({mounted: true});
      this.setState({fetching: false});
      this.setState({tip: 'Fetch'});
    }

    componentDidUpdate(prevProps, prevState){
      if(!this.state.mounted) return;
      if(prevProps !== this.props) {
        this.setState({fetching: this.props.favourite.fetching});
        const tip = (this.state.fetching) ? '...' : 'Fetch';
        this.setState({tip: tip});
      }
    }
    
    render() {
        return (
            <button type="button" 
            className={classNames("btn-basic blue1", { on: false })}
            tip={'Listen for new VOD and add it'} 
            onClick={this.onClickFetch} 
            style = {{position:"relative", left:1, float: 'left', zIndex: 1}}>
                {!this.state.fetching ? <span>{this.state.tip}</span>:
                <span>...</span>}
            </button>
        );
    }

}

export default FetchButton; 
