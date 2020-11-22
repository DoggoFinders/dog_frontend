import React from "react";
import PropTypes from "prop-types";
import BottomNav from "../BottomNav";
import {DisplayMapClass} from '../DisplayMapClass';

const LostDogs = (props) => {
  return (
    <>
      <div>
        <DisplayMapClass />
      </div>
      <BottomNav />
    </>
  );
};

LostDogs.propTypes = {};

export default LostDogs;
