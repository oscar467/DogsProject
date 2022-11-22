import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterCreated,
  orderByName,
  orderByWeight,
  filterByTemperament,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handlefilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleOrder(e) {
    e.preventDefault();
    if (e.target.value === "asc" || e.target.value === "desc") {
      dispatch(orderByName(e.target.value));
    } else {
      dispatch(orderByWeight(e.target.value));
    }
    setCurrentPage(1);
    setOrden(`Sort by ${e.target.value}`);
  }

  function handleFilterTemps(e) {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  }

  return (
    <div>
      <div className="top">
        <h1>🐶¡PUPPY WORLD!🐶</h1>
        <div className="bar">
            <div className="buttons">
                <Link to="/createdog">
                <button>Create Dog</button>
                </Link>
                <button onClick={(e) => {handleClick(e);}}>Reload dogs</button>
            </div>

          <div>
            <h3>Order By: </h3>
            <select onChange={(e) => handleOrder(e)}>
              <option value="asc">Ascendent Name </option>
              <option value="desc">Descendent Name</option>
              <option value="ascNum">Ascendent Weight</option>
              <option value="descNum">Descendent weight</option>
            </select>
          </div>
          <div className="containerFilters">
            <h3>Filter By: </h3>
            <div className="filters">
              <select onChange={(e) => handleFilterTemps(e)}>
                <option key={0} value="all">
                  All
                </option>
                {allTemperaments
                  ? allTemperaments.map((e) => {
                      return (
                        <option key={e.id} value={e.name}>
                          {e.name}
                        </option>
                      );
                    })
                  : null}
              </select>

              <select onChange={(e) => handlefilterCreated(e)}>
                <option value="All">all</option>
                <option value="api">api</option>
                <option value="created">created</option>
              </select>
            </div>
          </div>
          <div>
          <h3>Search dog: </h3>
          <SearchBar />
          </div>
        </div>
      </div>

      <div className="paginatedContainer">
        <Paginated
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginated={paginated}
          currentPage={currentPage}
        />
      </div>
      <div className="containerCards">
        {currentDogs &&
          currentDogs.map((el) => {
            return (
              <div>
                <Link to={`/home/${el.id}`}>
                  <Card
                    name={el.name}
                    image={
                      el.image
                        ? el.image
                        : "https://g.petango.com/shared/Photo-Not-Available-dog.gif"
                    }
                    weight={el.weight}
                    temperaments={el.temperaments}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
