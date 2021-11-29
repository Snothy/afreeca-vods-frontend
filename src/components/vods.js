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
            updated: false,
            updatedVods: [],
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

    handleStatusChange = (vods) => {
        //in case i need to update dynamically
    }

    handleFetchVods = (vods) => {
        if(!this.state.mounted) {
          return;
        }
        this.setState({updated: true});
        for(let i=0; i<vods.length; i++) {
            //this.state.updatedVods = this.state.vods;
            const currVods = this.state.vods;
            this.setState({updatedVods: currVods});
            this.state.vods.push(vods[i]);
            const updVods = this.state.updatedVods;
            this.setState({vods:updVods});
            this.setState({noneFound: false});
            //this.state.vods = this.state.updatedVods;
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.mounted) {
          return;
        }
        if(prevState.updated !== this.state.updated) {
            //this.state.streamers = this.state.updatedList;
            this.setState({updated:false});
            this.setState({updatedList: []});
        }
        //refresh all case
        //
      }

      componentWillUnmount() {
        this.setState({mounted: false});
      }

    render() {
        return (
            <>
            {!this.state.updated ? <VodList noneFound = {this.state.noneFound} vods = {this.state.vods} onStatusChange = {this.handleStatusChange} onFetchVods = {this.handleFetchVods}/>:
            <VodList noneFound = {this.state.noneFound} vods = {this.state.updatedVods} onStatusChange = {this.handleStatusChange} onFetchVods = {this.handleFetchVods}/>}
            </>
        );
    }
}

export default withRouter(Vods);