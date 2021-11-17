import FetchButton from "./FetchButton";
//import RefreshIdButton from "./RefreshIdButton"
import FavouriteRemoveButton from "./FavouriteRemoveButton"
import React from 'react';
import fromNow from "fromnow";
import { Link } from "react-router-dom";



class FavouriteItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bj: 0
        }
    }

    handleStatusChange = (bj) => {
        this.setState({bj: bj});
        this.props.onStatusChange(bj);

        //console.log(bj);
    }

    onRemove = (bj_id) => {
        this.props.onRemove(bj_id);
    }
    
    render() {
        //console.log(this.props);
        const favourite = this.props.favourite;
        var last_live_date = new Date(favourite.last_live);
        //last_live = last_live.toLocaleDateString()
        //console.log(last_live);
        //console.log(fromNow(aa, { max:1, suffix:true  }));
        const last_live = fromNow(last_live_date, { max:1, suffix:true  });
        const live_for = fromNow(last_live_date, { max:2});
        //console.log(favourite);
        return (
            <>
            <Link to={{pathname:`/${favourite.id}/`, favourite: {favourite}}} className="wrap">
            <FavouriteRemoveButton bj_id= {favourite.id} onRemove={this.onRemove}  className="btn-fav" />
                <div className="thumb" style={{ backgroundImage: `url(${favourite.avatar_url})` }}></div>
                <div className="nick"><strong>{`${favourite.nick}`}</strong>
                    {false && <span className="ico_subscribe"></span>}
                    {false && <span className="ico_fan"></span>}
                </div>
                <span className="id">{favourite.id}
                </span>
                    {!favourite.is_live ? <span className="last_live">
                    <em style={{color:"grey"}}> 
                        Recent Streams 
                        <em> {last_live} </em>
                    </em>
                    
                </span>
                :
                <>
                <span className="last_live">
                <div className="btns">
                    <div href="/#" className="live">LIVE</div>
                </div>
                </span>
                <p style={{paddingTop: 24, textAlign: 'center', color: "black", marginTop:-5, fontSize:13}}> {live_for} </p>
                </>}
                
                
                {favourite.is_live ? <FetchButton favourite={favourite} className="btn-fav"/>: null}
            </Link>
            </>
        );
    }

}

export default FavouriteItem;