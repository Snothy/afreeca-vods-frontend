import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import LoginContext from '../../contexts/login';
import info from '../../config';

class FetchXVodsButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vods: 0,
            refreshing: false,
            tip: 'Fetch vods',
            mounted: false
        }
    }

    static contextType = LoginContext;

    componentDidMount() {
      this.setState({mounted: true});
    }

    handleClickRefresh = (e) => {
        e.preventDefault();
        this.setState({refreshing: true});
        //this.state.tip = '...';
        this.setState({tip: '...'});
        //console.log(this.props.bj_id);

        //let cookie = sessionStorage.getItem(`cookie`);
        let cookie = this.context.cookie;
        cookie = {cookie: cookie};
        
        const url = info.url+`streamers/${this.props.bj_id}/fetchVods`;
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
            //this.state.tip = 'Fetch vods';
            this.setState({tip:'Fetch vods'});
            this.setState({refreshing: false});

            //pass vods data onto parent component (vods.js) for real-time state update
            this.props.onStatusChange(data);
        })
        .catch(err => {
            if(!this.state.mounted) return;

            //this.state.tip = 'Fetch vods';
            this.setState({tip:'Fetch vods'});
            this.setState({refreshing: false});
            //error handling
        })
    }

    handleStatusChange = () => {
        //const is_live = this.state.is_live;
    }

    componentWillUnmount() {
      this.setState({mounted: false});
    }

    render() {
        let style;
        style = {position:"absolute", left:25,  marginTop:202};
        if(this.context.loggedIn === true) {
            style = {position:"absolute", left:25,  marginTop:155};
        }
        const tip = this.state.tip;
        return (
            <button type="button" 
            className={classNames("btn-basic blue1 ", { on: false })}
            tip={'Get all available VODs'} 
            onClick={this.handleClickRefresh} 
            onChange={this.handleStatusChange}
            style = {style}>
                {!this.state.refreshing ? <span>{tip}</span>:
                <span>...</span>}
            </button>
        );
    }

}

//{on: true} is the click - use state for it
//style = {{marginTop: 145, paddingRight:20}}

export default FetchXVodsButton;