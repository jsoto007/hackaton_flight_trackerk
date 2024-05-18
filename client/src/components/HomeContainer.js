import React from "react";
import CarList from "./CarList";
import VinDecoder from "./barcode/VinDecoder";


export default function HomeContainer() {

  return(
    <div>
      <CarList />
      <VinDecoder />
    </div>
  )
}