import React, { useContext } from "react";
import Html5QrcodePlugin from "./barcode/Html5QrcodePlugin";
import { DataContext } from "../context/DataContextProvider";


export default function BarcodeContainer() {
  
  const { carData, setCarData } = useContext(DataContext)


  const onNewScanResult = (decodedText, decodedResult, setDecodedResults) => {
    console.log("App [result]", decodedResult);
    console.log("DECODED:", decodedText);
    setDecodedResults(decodedResult);
  };


  return (
    <div>
       <Html5QrcodePlugin
            fps={10}
            qrbox={50}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
    </div>
  )
}