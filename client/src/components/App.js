import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomeContainer from "./HomeContainer";

function App() {


    return (
        <div>
          <main>
            <Header />
            <Routes>
              <Route path="/" element={ <HomeContainer /> }/>
            </Routes>
          </main>
        </div>
      );
}

export default App;
