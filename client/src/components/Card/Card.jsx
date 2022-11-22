import React from "react";
import './Card.css'

export default function Card({ name, image, weight, temperaments }) {
  console.log(temperaments);
  let myTemps = "";
  if(Array.isArray(temperaments)) {
    //let aux = "";
    temperaments.forEach(e => myTemps += e.name + ", ");
    
  }else{
    myTemps = temperaments;
  }
  return (
    <div className="card">
      <img className="img" src={image} alt="img not found" width="200px" height="200px" />
      <div class="info">
        <span>{name}</span>
        <p>{weight} kg</p>
        <p>{myTemps}</p>
      </div>
     
    </div>
  );
}
