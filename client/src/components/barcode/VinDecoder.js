
import React, { useEffect, useState } from "react";
import vinDecoder from 'vin-decode';


export default function VinDecoder( { onVinData } ) {

  const [decodedVin, setDeodedVin] = useState([])

  useEffect(() => {
    if (onVinData) {
      const decodedVin = vinDecoder(`${onVinData.decodedText}`).decode();

      return setDeodedVin(decodedVin) 
    }

  }, [onVinData])

  return (
    <div className="mb-6 bg-neutral-200 rounded-sm">
      <p>
        <em className="font-bold"> Year:</em>
        <em className="bg-green-100 rounded-md px-1 mx-2">{decodedVin.year}</em>
        <em className="font-bold">Manufacturer:</em>
        <em className="bg-green-100 rounded-md px-1 mx-2">{decodedVin.manufacturer}</em>
        </p>
    </div>
  )
}
