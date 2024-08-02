import React from "react";
import { Link } from "react-router-dom";

function HorizontalCard(props){
    return (
        <div className="card mb-3 HorizontalCard-container" style={{maxWidth: '540px'}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={props.srcImg} className="img-fluid rounded-start" alt="..." style={{height:'100%', width:'100%'}}/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{`Your ${props.title}`}</h5>
                    <p className="card-text">{props.descr}</p>
                    <Link to={props.route}>
                        <button type="button" className="btn btn-primary">{`View ${props.title}`}</button>
                    </Link>
                </div>
                </div>
            </div>
            </div>
    );
}

export default HorizontalCard;