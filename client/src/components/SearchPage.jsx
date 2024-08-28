import React, { useEffect, useState } from "react";
import filterData from "../data/Filter.json";
import FilterDropdown from "./FilterDropdown";
import SearchCard from "./SearchCard";
import axios from "axios";
import $ from "jquery";

export default function SearchPage() {
  function handleChange(id) {
    setFilters({
      ...filters,
      [id]: $(`select[name='${id}'] option:selected`).val(),
    });
  }

  const [filters, setFilters] = useState({
    price: "NA",
    type: "NA",
  });

  const [data, setData] = useState({
    showData: [],
    allData: [],
  });

  useEffect(() => {
    var arr = data.allData;
    for (const key in filters) {
      if (filters[key] !== "NA") {
        if (key === "price") {
          const filterVar = +filters[key];
          arr = arr.filter((obj) => {
            return obj.price >= filterVar;
          });
        }
        if (key === "type") {
          const filterVar = filters[key];
          arr = arr.filter((obj) => {
            return obj.product_type === filterVar;
          });
        }
      }
    }
    setData((state) => ({
      ...state,
      showData: arr ? arr : [],
    }));
    console.log("CALLED");
  }, [filters, data.allData, setData]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}get/products/`
      );
      setData({
        showData: result.data.products,
        allData: result.data.products,
      });
    };
    getData();
  }, []);

  console.log(filters);
  console.log(data);

  return (
    <div className="SearchPage">
      <div className="FilterSection">
        <h1>Filters</h1>
        <hr />
        <div>
          <FilterDropdown
            arr={filterData.price}
            name="price"
            title="Price"
            func={handleChange}
          />
          <FilterDropdown
            arr={filterData.type}
            name="type"
            title="Type"
            func={handleChange}
          />
        </div>
      </div>
      <div className="SearchSection">
        <h1>Search Page</h1>
        <hr />
        {data.showData.map((obj) => {
          return <SearchCard data={obj} />;
        })}
      </div>
    </div>
  );
}
