import React from 'react';
import VodList from './ListsAndButtons/VodList';
import { withRouter } from "react-router";
import { status, json } from '../utilities/requestHandlers';

class Vods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vods: [],
            updated: false,
            updatedVods: [],
            noneFound: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://afreeca-backend.herokuapp.com/api/streamers/${id}/vods`, {
            method: "GET",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(data[0].date_released);
            //console.log(new Date(data[0].date_released) - new Date(data[4].date_released));
            //console.log(data);

            //sort vods by date released property
            data.sort(function(a, b) {
                return new Date(b.date_released) - new Date(a.date_released);
            })
            //console.log(data)
            this.setState({vods: data});
            //console.log(data);
            //let newData;
            //if(data.length === undefined) {
            //    newData = [data];
            //}
            //this.state.vods = data;
            //console.log(newData);
            //this.setState({vods: newData});
            //console.log(data);
            //console.log(this.state);
            //console.log(this.state.vods)
        })
        .catch(err => {
            if(err.status === 404) {
              this.setState({noneFound: true});
            }
        })
    }

    handleStatusChange = (vods) => {
        //in case i need to update dynamically
    }

    handleFetchVods = (vods) => {
        this.setState({updated: true});
        for(let i=0; i<vods.length; i++) {
            //this.state.updatedVods = this.state.vods;
            const currVods = this.state.vods;
            this.setState({updatedVods: currVods});
            this.state.vods.push(vods[i]);
            const updVods = this.state.updatedVods;
            this.setState({vods:updVods});
            //this.state.vods = this.state.updatedVods;
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

    render() {
        //console.log(this.state.vods);
        //console.log(this.state.fetched);
        
        return (
            <>
            {!this.state.updated ? <VodList noneFound = {this.state.noneFound} vods = {this.state.vods} onStatusChange = {this.handleStatusChange} onFetchVods = {this.handleFetchVods}/>:
            <VodList noneFound = {this.state.noneFound} vods = {this.state.updatedVods} onStatusChange = {this.handleStatusChange} onFetchVods = {this.handleFetchVods}/>}
            </>
        );
    }
}

export default withRouter(Vods);