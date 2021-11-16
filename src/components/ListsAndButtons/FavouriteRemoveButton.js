import React from "react";
import classNames from "classnames";
import { status, json } from '../../utilities/requestHandlers';
import {errorHandler} from '../../utilities/errorHandler';

class FavouriteRemoveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            removed: false
        }
    }

    handleClickRemove = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/streamers/${this.props.bj_id}`, {
            method: "DELETE",
            headers: {
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            if(data.removed === true) {
                this.setState({removed: true});
                //console.log('a');
                const id = this.props.bj_id;
                //console.log(this.props);
                this.props.onRemove(id);
                //console.log('b');

            }
        })
        .catch(err => {
            const error = errorHandler(err);
            console.log(error);
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
            className={classNames("btn-basicrr ", { on: false })}
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