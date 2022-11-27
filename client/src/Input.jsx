import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./App.css";

const Input = () => {
  document.title = "Search App";
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    document.getElementById("input-search").focus();
  }, []);

  const handleSearch = () => {
    if (inputData === "" || inputData.trim() === "") {
      Swal.fire("Empty fields ?");
    } else {
      Axios({
        method: "POST",
        url: "http://localhost:5000/search",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: { searchtext: inputData },
      })
        .then((response) => {
          if (response.status === 200) {
            setData(response.data.data);
          }
        })
        .catch((error) => {
          console.log("Error in searching!", error.toString());
          // Swal.fire(`${error.response.err}`);
        });
    }
  };
  // const handleKeyDown = async (e) => {
  //   if (e.key === "Enter" || e.keyCode === 13) {
  // e.preventDefault();
  //     if (inputData === "" || inputData.trim() === "") {
  //       Swal.fire("Empty fields ?");
  //     } else {
  //       Axios({
  //         method: "POST",
  //         url: "http://localhost:5000/search",
  //         headers: {
  //           "Content-Type": "application/json;charset=utf-8",
  //         },
  //         data: { searchtext: inputData },
  //       })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             setData(response.data.data);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log("Error in searching!", error.toString());
  //           // Swal.fire(`${error.response.err}`);
  //         });
  //     }
  //   }
  //   return;
  // };
  // document.addEventListener("keydown", handleSearchEnter, true);

  return (
    <>
      <section className="container text-center mt-5">
        <input
          id="input-search"
          type="text"
          placeholder="Search"
          onChange={(e) => setInputData(e.target.value)}
          className="form-control"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch} className="btn btn-danger btn-lg mt-4">
          Search
        </button>
      </section>
      <section className="container mt-4 mb-5">
        <div className="row">
          <div className="col-lg-12 cards-div">
            {data.map((val, index) => {
              return (
                <div className="card" style={{ width: "16rem" }} key={index}>
                  <img src={val.imageUrl} className="card-img-top" alt={val.imageUrl} />
                  <div className="card-body">
                    <h5 className="card-title">{val.primaryText}</h5>
                    <p className="card-text">{val.headline}</p>
                    <p>{val.description}</p>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-dark" id="btn-search">
                      {val.CTA}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Input;
