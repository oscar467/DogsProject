import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import "./DogsCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  }
  
  if (!input.minHeight) {
    errors.minHeight = "minimum height is required";
  }
  if (!input.maxHeight) {
    errors.maxHeight = "maximum height is required";
  }
  if (!input.minWeight) {
    errors.minWeight = "minimum weight is required";
  }
  if (!input.maxWeight) {
    errors.maxWeight = "maximum weight is required";
  }

  if (isNaN(input.minHeight)) {
    errors.minHeight = "minimum height is a number";
  }
  if (isNaN(input.maxHeight)) {
    errors.maxHeight = "maximum height is a number";
  }
  if (isNaN(input.minWeight)) {
    errors.minWeight = "minimum weight is a number";
  }
  if (isNaN(input.maxWeight)) {
    errors.maxWeight = "maximum weight is a number";
  }
  if (isNaN(input.life_span)) {
    errors.life_span = "life span is a number";
  }

  if (
    input.minHeight &&
    input.maxHeight &&
    parseInt(input.minHeight) >= parseInt(input.maxHeight)
  )
    errors.maxHeight = "Maximum height is minor a Minimun height";
  if (
    input.minWeight &&
    input.maxWeight &&
    parseInt(input.minWeight) >= parseInt(input.maxWeight)
  )
    errors.maxWeight = "Maximum weight is minor a Minimun weight";

  if (input.minHeight && parseInt(input.minHeight) <= 5)
    errors.minHeight = "Minimum height must be major at 5cm";
  if (input.maxHeight && parseInt(input.maxHeight) <= 5)
    errors.maxHeight = "Maximum height must be major 5 cm";
  if (input.minWeight && parseInt(input.minWeight) <= 1)
    errors.minWeight = "Minimum weight must be major at 1kg";
  if (input.maxWeight && parseInt(input.maxWeight) <= 1)
    errors.maxWeight = "Maximum weight must be major at 1kg";
  if (input.maxWeight && parseInt(input.maxWeight) >= 100)
    errors.maxHeight = "Maximum Weight must be minor at 100kg";
  if (input.minWeight && parseInt(input.minWeight) >= 100)
    errors.minHeight = "Minimum Weight must be minor at 100kg";
  return errors;
}

export default function DogsCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    image: "",
    life_span: "",
    temperaments: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.minHeight &&
      !errors.maxHeight &&
      !errors.maxWeight &&
      !errors.minWeight &&
      !errors.life_span
    ) {
      dispatch(postDog(input));
      alert("Dog created!");
      setInput({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        image: "",
        life_span: "",
        temperaments: [],
      });
      history.push("/home");
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((e) => e !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Return</button>
      </Link>
      <h1>Create Dog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form">
          <div>
            <label>Name:</label>
            <input value={input.name} name="name" onChange={handleChange} />
          </div>
          <div>
            <label>image url:</label>
            <input value={input.image} name="image" onChange={handleChange} />
          </div>

          <div>
            <label>height:</label>
            <input
              value={input.minHeight}
              name="minHeight"
              placeholder="Min. height"
              onChange={handleChange}
            />
            <input
              value={input.maxHeight}
              name="maxHeight"
              placeholder="Max. height"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>life span:</label>
            <input
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>weight:</label>
            <input
              value={input.minWeight}
              name="minWeight"
              placeholder="Min. weight"
              onChange={handleChange}
            />
            <input
              value={input.maxWeight}
              name="maxWeight"
              placeholder="Max. height"
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Temperaments: </label>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments.map((temp) => (
                <option value={temp.name}>{temp.name}</option>
              ))}
            </select>
          </div>
          <div>
            {Object.keys(errors).length ? (
              <ul>
                {Object.keys(errors).map((e) => {
                  return <li>{errors[e]}</li>;
                })}
              </ul>
            ) : null}
          </div>
          <div>
            {input.temperaments.map((el) => (
              <div className="divTemp">
                <p>{el}</p>
                <button className="buttonX" onClick={() => handleDelete(el)}>
                  X
                </button>
              </div>
            ))}
            ;
          </div>
        </div>

        <button type="submit" id="buttonSubmit">
          Create dog
        </button>
      </form>
    </div>
  );
}
