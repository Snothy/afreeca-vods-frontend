import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import info from '../../config';

class FavouriteRemoveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            removed: false
        }
    }

    handleClickRemove = (e) => {
        e.preventDefault();
        const url = info.url+`streamers/${this.props.bj_id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(data.removed === true) {
                this.setState({removed: true});
                this.props.onRemove(this.props.bj_id);
            }
        })
        .catch(err => {
            console.log(err);
            //error handling
        })
        
    }

    handleStatusChange = () => {
      //const is_removed = this.state.removed;
    }


    render() {
        const tip = 'Remove';
        return (
            <button type="button" 
            className={classNames("btn-basic blue1 ", { on: false })}
            tip={tip} 
            onClick={this.handleClickRemove} 
            onChange={this.handleStatusChange}
            style = {{position:"relative", left:1, bottom:20, float: 'right'}}>
                <span>X</span>
            </button>
        );
    }

}

//{on: true} is the click - use state for it
//style = {{marginTop: 145, paddingRight:20}}

export default FavouriteRemoveButton;