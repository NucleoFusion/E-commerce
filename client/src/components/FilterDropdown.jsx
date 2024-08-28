import React from "react";

export default function FilterDropdown(props) {
  function toParent(e) {
    props.func(e.target.name);
  }
  return (
    <select
      className="form-select"
      name={props.name}
      aria-label="Default select example"
      onChange={toParent}
    >
      <option defaultValue={"NA"} value={"NA"}>
        {props.title}
      </option>
      {props.arr.map((obj) => {
        return (
          <option key={props.arr.indexOf(obj)} value={obj.value}>
            {obj.name}
          </option>
        );
      })}
    </select>
  );
}
