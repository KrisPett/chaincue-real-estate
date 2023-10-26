"use client"

import React from 'react';
import {useParams} from "next/navigation";

const HouseView = () => {
  let {id} = useParams();
  console.log(id)

  return (
      <div>
        HouseView
      </div>
  );
};

export default HouseView;
