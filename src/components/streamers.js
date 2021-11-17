import React from 'react';
//import RefreshAllButton from "./ListsAndButtons/RefreshAllButton"
//import RefreshAllFastButton from "./ListsAndButtons/RefreshAllFastButton"
import FavouriteList from './ListsAndButtons/FavouriteList';
import { status, json } from '../utilities/requestHandlers';
import {errorHandler} from '../utilities/errorHandler';
import info from '../config';

class Streamers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamers: [],
            updated: false,
            updatedList: [],
            noneFound: false,
            mounted: false,
            fetching: []
        }
    }

    componentDidMount() {
      this.setState({mounted: true});
      let url = info.config.url+`streamers/`;
        fetch(url, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(this.state.mounted) {
              this.setState({streamers: data});
            }
        })
        .catch(err => {
            const error = errorHandler(err);
            if(error[0] === false) {
              this.setState({noneFound: true});
            } else {
              console.error(error);
            }
            //error handling
        });
        
        //cleaner way of updating live status that individual button presses
        url = info.config.url+`streamers/refresh/all/fast`;
        fetch(url, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(this.state.mounted) {
              for(let i=0; i<data.streamers.length; i++) {
                data.streamers[i].fetching = data.fetching[i].fetching;
              }
              this.setState({streamers: data.streamers});
            }
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
                const streamers = this.state.streamers;
                this.setState({updatedList: streamers});
                //console.log('a');
                //console.log(this.state.streamers);
                break;
            }
        }
        if(this.state.streamers.length ===0 ) {
          this.setState({noneFound: true});
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

      componentWillUnmount() {
        this.setState({mounted:false});
      }

    render() {
        if(this.state.noneFound) {
          return(
          <div id="favorite_list" className="favor-wrap" style={{
          marginTop: -35, paddingLeft:50
          }}>
              <h2 className='big h2'>None found</h2>
          </div>
          )
        }
        if (!this.state.streamers.length) {
          return(
            <>
            <h2 >Loading streamers..</h2>
            </>
          );
        }

        return (
            < >
                {!this.state.updated ?<FavouriteList streamers = {this.state.streamers} onStatusChange = {this.handleStatusChange} onRemove= {this.onRemove}/>:
                <FavouriteList streamers = {this.state.updatedList} onStatusChange = {this.handleStatusChange} onRemove= {this.onRemove}/>}
                
            </>
        )
    }
}

//<RefreshAllButton streamers= {this.state.streamers} onStatusChange={this.handleAllStatusChange}  className="btn-fav" />      


export default Streamers;