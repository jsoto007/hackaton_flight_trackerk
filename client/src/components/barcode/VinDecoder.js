
import React, { useEffect, useState } from "react";
import vinDecoder from 'vin-decode';


export default function VinDecoder( { onVinData } ) {


  const [vinNumber, setVinNumber] = useState([])
  

  useEffect(() => {
    if (onVinData) {
      const decodedVin = vinDecoder(`${onVinData.decodedText}`).decode();

      return setVinNumber(decodedVin) 
    }

  }, [onVinData])


  console.log("Passed down:", onVinData)
  console.log("decoded:", vinNumber)
  

  return (
    <div className="mb-6 bg-neutral-200 rounded-sm">
      <p><em className="font-bold">Year:</em> {vinNumber.year} <em className="font-bold">Manufacturer:</em> {vinNumber.manufacturer}</p>
    </div>
  )
}