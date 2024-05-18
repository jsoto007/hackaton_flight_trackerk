import React, { useState, useContext } from "react";
import Html5QrcodePlugin from "./barcode/Html5QrcodePlugin";
import VinDecoder from "./barcode/VinDecoder";
import { DataContext } from "../context/DataContextProvider";

export default function BarcodeContainer() {

  const { carData, setCarData } = useContext(DataContext)
  const [vinData, setVinData] = useState()



  const onNewScanResult = (decodedText, decodedResult, setDecodedResults) => {
    console.log("App [result]", decodedResult);
    console.log("DECODED:", decodedText);
    setVinData(decodedResult);
    setDecodedResults(decodedResult);
  };

  console.log("vinDATA:", vinData)

  return (
    <div>
      <VinDecoder  
        onVinData={vinData}
      />

      <Html5QrcodePlugin
        fps={10}
        qrbox={50}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />

    </div>
  )
}
