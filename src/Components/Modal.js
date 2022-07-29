import React from "react";

export default function Modal({ closeModal }) {
  
    const handleClick = (e) => {
    e.preventDefault();
    closeModal(false)
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <h2>Sorry, We can't find anything in that category.</h2>
        <h3>Try something else...</h3>
        <button onClick={handleClick}> Close </button>
      </div>
    </div>
  );
}
