import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import {errorHandler} from '../../utilities/errorHandler';
import LoginContext from '../../contexts/login';

class FetchButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            tip: 'Fetch'
        }
    }

    static contextType = LoginContext;

    onClickFetch = (e) =>{
        e.preventDefault();
        this.setState({fetching: true});
        //this.state.tip = '...';
        this.setState({tip:'...'});
        localStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(true) );
        localStorage.setItem( `tip${this.props.bj_id}`, '...' );

        //let cookie = sessionStorage.getItem(`cookie`);
        let cookie = this.context.cookie;
        cookie = {cookie: cookie};
        
        fetch(`https://afreeca-backend.herokuapp.com/api/streamers/${this.props.bj_id}/fetch`, {
            method: "POST",
            body: JSON.stringify(cookie),
            headers: {
                "Content-Type": "application/json", 
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            //this.state.tip = 'Fetch';
            //this.setState({fetching: false});
            localStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(false) );
            localStorage.setItem( `tip${this.props.bj_id}`, 'Fetch' );

        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);

            localStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(false) );
            localStorage.setItem( `tip${this.props.bj_id}`, 'Fetch' );
            //error handling
        })
        //fetch code...
        //make function a class
    }

    componentDidMount() {
      const fetchingState = (localStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
      this.setState({fetching:fetchingState});
      const tipState = localStorage.getItem(`tip${this.props.bj_id}`);
      this.setState({tip:tipState});
    }


    
    render() {
        //this.state.fetching = (localStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
        //const fetchingState = (localStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
        //console.log(fetchingState);
        //this.setState({fetching:fetchingState});
        //console.log(this.state.fetching);
        //console.log(typeof(this.state.fetching));
        let fetching = this.state.fetching
        if(fetching === null) {
            fetching = false;
        }
        
        //this.state.tip = localStorage.getItem(`tip${this.props.bj_id}`);
        //const tipState = localStorage.getItem(`tip${this.props.bj_id}`);
        //console.log(tipState);
        //this.setState({tip:tipState});
        let tip = this.state.tip;
        //console.log(tip===null);
        if (tip === null) {
            tip = 'Fetch';
        }

        //console.log(tip);
        //console.log(fetching);
        //console.log(tip);

        return (
            <button type="button" className={classNames("btn-basic blue1", { on: false })}
            tip={'Listen for new VOD and add it'} 
            onClick={this.onClickFetch} 
            style = {{
            }}> 
                {!fetching ? <span>{tip}</span>:
                <span>...</span>}
            </button>
        );
    }

}

export default FetchButton; 
/*
        <button type="button" className={classNames("btn-fix ", { on: item.is_pin })} tip={tip} onClick={onClickPin(item)}>
            <span>{tip}</span>
        </button>
*/

/*
        <div className="btns" >
            <a href="" onClick={onClickFetch(bj_id)} target="_blank" className="fetch" >
                refresh
            </a>
        </div>
*/