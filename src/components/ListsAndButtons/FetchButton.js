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
            tip: 'Fetch'
        }
    }

    static contextType = LoginContext;

    onClickFetch = (e) =>{
        e.preventDefault();
        this.setState({fetching: true});
        this.setState({tip:'...'});
        //sessionStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(true) );
        //sessionStorage.setItem( `tip${this.props.bj_id}`, '...' );
        //let cookie = sessionStorage.getItem(`cookie`);
        let cookie = this.context.cookie;
        cookie = {cookie: cookie};
        
        const url = info.config.url+`streamers/${this.props.favourite.id}/fetch`;
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
            //sessionStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(false) );
            //sessionStorage.setItem( `tip${this.props.bj_id}`, 'Fetch' );

        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);

            //sessionStorage.setItem( `fetching${this.props.bj_id}`, JSON.stringify(false) );
            //sessionStorage.setItem( `tip${this.props.bj_id}`, 'Fetch' );
            //error handling
        })
        //fetch code...
        //make function a class
    }

    componentDidMount() {
      //const fetchingState = (sessionStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
      //this.setState({fetching:fetchingState});
      //const tipState = sessionStorage.getItem(`tip${this.props.bj_id}`);
      //this.setState({tip:tipState});
      this.setState({fetching: false});
      this.setState({tip: 'Fetch'});
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps !== this.props) {
        console.log('a');
        console.log(this.props);
        this.setState({fetching: this.props.favourite.fetching});
        const tip = (this.state.fetching) ? '...' : 'Fetch';
        this.setState({tip: tip});
      }
    }
    
    render() {
      //console.log(this.state.fetching);
      /*
      let fetching, tip;
      if(this.props.favourite.length > 0) {
        fetching = this.props.favourite.fetching;
        tip = (fetching) ? '...' : 'Fetch';
      } else {
        fetching = false;
        tip = 'Fetch'
      }
      */
      /*
      for(let i=0; i<this.props.fetching.length; i++) {
        if(this.props.fetching[i].bj_id === this.props.bj_id) {
          fetching = this.props.fetching[i].fetching;
          if(this.props.fetching[i].fetching) {
            tip = '...';
          } else {
            tip = 'Fetch';
          }
        }
      }
      */
        //this.state.fetching = (sessionStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
        //const fetchingState = (sessionStorage.getItem(`fetching${this.props.bj_id}`) === 'true');
        //console.log(fetchingState);
        //this.setState({fetching:fetchingState});
        //console.log(this.state.fetching);
        //console.log(typeof(this.state.fetching));
        //let fetching = this.state.fetching
        
        //this.state.tip = sessionStorage.getItem(`tip${this.props.bj_id}`);
        //const tipState = sessionStorage.getItem(`tip${this.props.bj_id}`);
        //console.log(tipState);
        //this.setState({tip:tipState});
        //let tip = this.state.tip;
        //console.log(tip===null);

        //console.log(tip);
        //console.log(fetching);
        //console.log(tip);

        return (
            <button type="button" 
            className={classNames("btn-basic blue1", { on: false })}
            tip={'Listen for new VOD and add it'} 
            onClick={this.onClickFetch} 
            style = {{position:"relative", left:1, float: 'left'}}>
                {!this.state.fetching ? <span>{this.state.tip}</span>:
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