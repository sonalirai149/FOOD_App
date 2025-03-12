import React, { useContext } from "react";
import "./Rescard.css";
import UserContext from "../../utils/UserContext.js";

const Rescard = ({resdata}) => {
    const { name, cuisines, cloudinaryImageId, avgRating, costForTwo, sla, areaName } = resdata.info;
    const {loggedInUser}=useContext(UserContext)

    return (
        <div className="res-card">
            <div style={{width:'100%'}}>
                <img 
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} 
                    className="res-img" 
                    alt={name}
                />
            </div>
            <div className="card-content">
                <p className="res-name ">{name}</p>
                <h4 children className="">User:{loggedInUser}</h4>
                <p className="res-cuisine">{cuisines?.join(", ")}</p>
                <div className="res-info ">
                    <span className="res-rating ">⭐ {avgRating}</span>
                    <span className="res-delivery-time" style={{paddingLeft: "6px"}}>⏱ {sla.deliveryTime} mins</span>
                </div>
                <p className="res-price">{costForTwo}</p>
                <p className="res-location">📍 {areaName}</p>
                {/* <h4 children className="">User:{loggedInUser}</h4> */}
            </div>
        </div>
    );
}

export const RescardwithLabel= (Rescard) => {
    return (props) =>{
        return(
            <>
            <label>Promoted</label>
            <Rescard {...props}></Rescard>
            </>
            
        )
    }
}

export default Rescard;
