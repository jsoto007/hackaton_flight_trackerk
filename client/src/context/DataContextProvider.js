import React, { useState } from "react";

const DataContext = React.createContext();

export default function DataContextProvider( { children } ) {

  const [carData, setCarData] = useState([])

  return(
    <DataContext.Provider value={{
      carData,
      setCarData
    }}>
      {children}
    </DataContext.Provider>
  )
}


export {DataContext, DataContextProvider}