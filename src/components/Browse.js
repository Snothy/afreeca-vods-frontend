import React from 'react';
import BrowseList from './ListsAndButtons/BrowseList';
import { status, json } from '../utilities/requestHandlers';
import info from '../config';

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamers: [],
            noneFound: false,
            mounted: false,
            page: 1
        }
    }

    componentDidMount() {
      this.setState({mounted: true});
      const body = {
        page: this.state.page
      };
      let url = info.url+`streamers/browse`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(! this.state.mounted) return;
            const page = this.state.page + 1; //increment page for next request
            this.setState({page: page});
            this.setState({streamers: data});
        })
        .catch(err => {
          console.log(err);
        });
        
    }

    handleGetMore = (getMore) => {
      if(!getMore || !this.state.mounted) return;
      const body = {
        page: this.state.page
      };
      let url = info.url+`streamers/browse`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(! this.state.mounted) return;
            const page = this.state.page + 1; //increment page for next request
            this.setState({page: page});
            let currStreamers = this.state.streamers;
            currStreamers = currStreamers.concat(data);
            this.setState({streamers: currStreamers});
            //console.log('curr: ', this.state.streamers.length);
            //console.log('new: ', data.length);
            //console.log(this.state.streamers.length);
            //console.log('concated: ', this.state.streamers.length);
            //console.log(this.state.streamers[61]);
        })
        .catch(err => {
          console.log(err);
        });
    }


    componentDidUpdate(prevProps, prevState){
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
                <BrowseList streamers={this.state.streamers} onGetMore={this.handleGetMore} />
            </>
        )
    }
}


export default Browse;