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

    handleFetchVods = (e) => {
        e.preventDefault();
        this.setState({refreshing: true});
        this.setState({tip: '...'});
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
            this.setState({tip:'Fetch vods'});
            this.setState({refreshing: false});

            //pass vods data onto parent component (vods.js) for real-time state update
            this.props.handleFetchVods(data);
        })
        .catch(err => {
            if(!this.state.mounted) return;
            this.setState({tip:'Fetch vods'});
            this.setState({refreshing: false});
            //error handling
        })
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
            onClick={this.handleFetchVods} 
            style = {style}>
                {!this.state.refreshing ? <span>{tip}</span>:
                <span>...</span>}
            </button>
        );
    }

}

export default FetchXVodsButton;
