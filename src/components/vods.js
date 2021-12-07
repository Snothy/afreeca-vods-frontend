import React from 'react';
import VodList from './ListsAndButtons/VodList';
import { withRouter } from "react-router";
import { status, json } from '../utilities/requestHandlers';
import info from '../config';

class Vods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vods: [],
            noneFound: false,
            mounted: false
        }
    }

    componentDidMount() {
        this.setState({mounted: true});
        const id = this.props.match.params.id;
        const url = info.url+`streamers/${id}/vods`;
        fetch(url, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(!this.state.mounted) {
              return;
            }
            //sort vods by date released property
            data.sort(function(a, b) {
                return new Date(b.date_released) - new Date(a.date_released);
            })
            //console.log(data)
            this.setState({vods: data});
        })
        .catch(err => {
            if(!this.state.mounted) {
              return;
            }
            if(err.status === 404) {
              this.setState({noneFound: true});
            }
          })
    }

    handleFetchVods = (vods) => {
      if(!this.state.mounted) return;
      let currVods = this.state.vods;
      
      // adding new vods
      if(!this.state.noneFound) {
        vods = vods.reverse();
        for(let i = 0; i < vods.length; i++) {
          currVods.unshift(vods[i]);
        }
        this.setState({vods: currVods});
        return;
      }

      // no vods present
      for(let i=0; i<vods.length; i++) {
          currVods.push(vods[i]);
      }
      this.setState({vods: currVods});
      this.setState({noneFound: false});
  }

    componentWillUnmount() {
      this.setState({mounted: false});
    }

    render() {
        return (
            <>
            <VodList noneFound = {this.state.noneFound} vods = {this.state.vods} handleFetchVods = {this.handleFetchVods}/>
            </>
        );
    }
}

export default withRouter(Vods);