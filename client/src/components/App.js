import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import BirdPage from "./BirdPage";
import BirdDetail from "./BirdDetail"
import Hero from "./Hero";

function App() {


    return (
        <div>
          <main>
            <Header />
            <Routes>
              <Route path="/:id" element={ <BirdDetail /> }/>
              <Route path="/" element={ <Hero /> }/>
            </Routes>
          </main>
        </div>
      );
}

export default App;
