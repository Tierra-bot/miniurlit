import { BrowserRouter as ROuter, Switch, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <switch>
            <Route exact path='/' Component={Form} />
            <Route exact path="/app" Component={Form} />
          </switch>
        </div>
      </div>
    </div>
  );
}

export default App;
