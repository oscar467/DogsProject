import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import "./Detail.css"

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myDog = useSelector ((state) => state.detail)

    return (
        <div className="containerDetail">
            {
                myDog.length>0 ? 
                    <div>
                        <h1>Im {myDog[0].name}</h1>
                        <img src={myDog[0].image} width='500px' height='500px'/>
                        <h2>Height: {myDog[0].height}</h2>
                        <h2>Weight: {myDog[0].Weight}</h2>
                        <h2>life span: {myDog[0].life_span}</h2>
                        <h2>my's Temperaments: {!myDog[0].createdInDB? myDog[0].temperaments: myDog[0].temperaments.map(el => el.name +(' '))}</h2>
                    </div> : <p>Not found</p>
            }
            <Link to= '/home'>
                <button>Return</button>
            </Link>
        </div>
    )
}