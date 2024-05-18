import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomeContainer from "./HomeContainer";
import BarcodeContainer from "./BarcodeContainer";

function App() {


    return (
        <div>
          <main>
            <Header />
            <Routes>
              <Route path="/" element={ <HomeContainer /> }/>
              <Route path="/scanner" element={ <BarcodeContainer /> }/>
            </Routes>
          </main>
        </div>
      );
}

export default App;
