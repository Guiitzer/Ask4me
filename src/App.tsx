import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import "./styles/global.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/newroom" exact component={NewRoom} />
          <Route path="/room/:id" component={Room} />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
