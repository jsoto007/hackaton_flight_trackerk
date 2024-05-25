import React from "react";
import CarList from "./CarList";
import UserLocation from "./location/UserLocation";

export default function HomeContainer() {

  return(
    <div>
      <CarList />
      <UserLocation />
    </div>
  )
}