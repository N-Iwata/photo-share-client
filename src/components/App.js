import { BrowserRouter } from "react-router-dom";
import AuthrizedUser from "./AuthrizedUser";
import Users from "./Users";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthrizedUser />
        <Users />
      </BrowserRouter>
    </div>
  );
};

export default App;
