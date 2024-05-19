import React from "react";

function Model({ name, params, activated }){
  return (
    <div className={`p-4 border-b border-gray-300 ${activated && "bg-gray-200"}`}>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{params}</p>
      <button className="float-right bg-blue-500 text-white py-1 px-2 rounded">
        Activate
      </button>
    </div>
  );
};

export default Model;