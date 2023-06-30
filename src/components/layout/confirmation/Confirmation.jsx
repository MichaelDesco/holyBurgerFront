import React from "react";

const Confirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation">
      <h3>Confirmation</h3>
      <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
      <div className="buttons">
        <button onClick={onConfirm}>Oui</button>
        <button onClick={onCancel}>Non</button>
      </div>
    </div>
  );
};

export default Confirmation;
