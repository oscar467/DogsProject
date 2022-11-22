import React from "react";
import './Paginated.css';

export default function Paginated ({dogsPerPage, allDogs,paginated, currentPage}){
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div class="container">
            <ul className="paginated">
                {
                    pageNumbers&&pageNumbers.map(number => (
                        <li className={currentPage == number ? 'number active': 'number'} key={number} >
                            <a onClick={() => {paginated(number)}}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}