
import React from "react";
import vinDecoder from 'vin-decode';



export default function VinDecoder( { vin } ) {

  const decodedVin = vinDecoder('WBA8E3G56GNU01814').decode();

  console.log("decoded VIN:", decodedVin)
  
  return (
    <div>
      <p>{decodedVin.year} {decodedVin.manufacturer}</p>
    </div>
  )
}