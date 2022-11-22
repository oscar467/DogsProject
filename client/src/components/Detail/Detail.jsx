import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myDog = useSelector ((state) => state.detail)

    return (
        <div>
            {
                myDog.length>0 ? 
                    <div>
                        <h1>soy {myDog[0].name}</h1>
                        <img src={myDog[0].image} width='500px' height='500px'/>
                        <h2>Height {myDog[0].height}</h2>
                        <h2>Weight {myDog[0].Weight}</h2>
                        <h2>life span {myDog[0].life_span}</h2>
                        <h2>Temperaments {myDog[0].temperaments}</h2>
                    </div>
            }
        </div>
    )
}