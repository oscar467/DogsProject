import React from "react";
import { useState } from "react";
import { useDispatch  } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import './SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("entro a submit ....... "+name)
        dispatch(getNameDogs(name));
        setName("");
    }
    return (
        <div className="input-wrapper">
            <input 
            type='text'
            placeholder = 'Search...'
            onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
                Search
            </button>
        </div>
    )
}