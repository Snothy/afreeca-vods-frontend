import FavouriteItem from "./FavouriteItem";
import React from "react";

class FavouriteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mounted: false
        }
    }

    componentDidMount() {
      this.setState({mounted: true});
    }

    onRemove = (bj_id) => {
      if(!this.state.mounted) return;
      this.props.onRemove(bj_id);
    }

    componentWillUnmount() {
      this.setState({mounted:false});
    }

    render() {
        if (this.props.streamers.length > 0) {
          return (
            <div id="favorite_list" className="favor-wrap" style={{
                marginTop: -35, paddingLeft:50
            }}>
            <div className="favor-list">

            <h2 className='big.h2'>LIVE</h2>
                <ul>
                  {this.props.streamers.filter(streamer => streamer.is_live).map(streamer => {
                    return(
                      <li key={streamer.id}>
                        <FavouriteItem favourite={streamer} onStatusChange={this.handleStatusChange} onRemove ={this.onRemove}/>
                      </li>
                    )
                  })}
                </ul>
            
            <h2 className='big.h2'>OFFLINE</h2>
                <ul>
                {this.props.streamers.filter(streamer => !streamer.is_live).map(streamer => {
                    return(
                      <li key={streamer.id}>
                        <FavouriteItem favourite={streamer} onStatusChange={this.handleStatusChange} onRemove ={this.onRemove}/>
                      </li>
                    )
                  })}
                </ul>

            </div>
            </div>
          )
        } else {
            return(
                <>
                </>
            );
        }
    }
}

export default FavouriteList;
