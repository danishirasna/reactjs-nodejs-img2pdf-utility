import React from "react";
import PropTypes from 'prop-types';
import RecordNotFoundIMG from "./../../assets/404-data.png";
export const RecordNotFound = ({ img, error, maxWidth }) => {
  return (
    <div className="record_not_found mt-5">
      <div className="record_not_found_inner">
        <div className="no_record_image">
          <img src={img ? img : RecordNotFoundIMG} alt="" className="not-found"/>
        </div>
        <div className="font-weight-bold text-danger">{error ? error : 'Sorry, No Record Found.'}</div>
      </div>
    </div>
  );
};

RecordNotFound.propTypes = {
  img: PropTypes.string,
  error: PropTypes.string,
  maxWidth: PropTypes.string
};