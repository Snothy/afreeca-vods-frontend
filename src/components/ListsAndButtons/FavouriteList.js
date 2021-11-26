import FavouriteItem from "./FavouriteItem";
import React from "react";

class FavouriteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourite: 0
        }
    }

    handleStatusChange = (bj) => {
        //this.setState({bj: bj});
        //console.log(bj);
        this.props.onStatusChange(bj);
    }

    onRemove = (bj_id) => {
        this.props.onRemove(bj_id);
    }

    render() {
      const favouritesLive = this.props.streamers.map((favourite) => {
        if(favourite.is_live) {
          return(
            <li key={favourite.id}>
              <FavouriteItem favourite={favourite} onStatusChange={this.handleStatusChange} onRemove ={this.onRemove}/>
            </li>
          )
        }
        return null;
      });

      const favouritesOffline = this.props.streamers.map((favourite) => {
        if(!favourite.is_live) {
          return(
            <li key={favourite.id}>
              <FavouriteItem favourite={favourite} onStatusChange={this.handleStatusChange} onRemove ={this.onRemove}/>
            </li>
          )
        } else {
          return null;
        }
      });

        if (this.props.streamers.length > 0) {
            return (
                <>
                <div id="favorite_list" className="favor-wrap" style={{
                    marginTop: -35, paddingLeft:50
                }}>
                    <h2 className='big.h2'>LIVE</h2>
                <div className="favor-list">
                    <ul>
                      {favouritesLive}
                    </ul>
                </div>
                </div>
                
                <div id="favorite_list" className="favor-wrap"style={{
                    marginTop: -35, paddingLeft:50
                }}>
                <h2 className='big.h2'>OFFLINE</h2>
                <div className="favor-list">
                    <ul>
                      {favouritesOffline}
                    </ul>
                </div>
                </div>
                </>
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


/*
        if (this.props.streamers.length > 0) {
            return (
            <div id="favorite_list" className="favor-wrap">
                <div className="favor-list">
                    <ul>
                        {this.props.streamers.map((favourite, index) =>
                            <li key={index}>
                                <FavouriteItem favourite={favourite} onStatusChange={this.handleStatusChange}/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>);
        } else {
            return (
                <>
                </>
            );
        }
*/