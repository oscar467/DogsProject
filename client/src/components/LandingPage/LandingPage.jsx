import React from "react";
import { Link } from "react-router-dom";
import Video from "../../video/bulldogs_baby.mp4"
import './LandingPage.css';

export default function LandingPage(){
    return(
        <div className="container">
            
        <video src={Video} autoPlay muted loop></video>
                <div className="text">
                <h1>¡Welcome to PUPPY WORLD!</h1>
                <div className="link">
                <Link to='/home'>
                <button>Ingresar</button>
                </Link>
                </div>
                </div>
        <div className="container-text">
            </div>
        </div>
    )
}