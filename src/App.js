import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import * as FirebaseController from "./components/firebaseController";

function App() {
  const [pathOnDB, setPathOnDB] = useState("");
  const [data, setData] = useState("");
  const [dataReceived, setDataReceived] = useState("");
  const [dataIsJson, setDataIsJson] = useState(false);

  function onButtonCreateUpdateClicked() {
    const DATA = dataIsJson ? JSON.parse(data) : data
    FirebaseController.createOrUpdateData(pathOnDB, DATA, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonCreateUpdateClicked", data);
    });
  }

  function onButtonCreateItemListClicked() {
    const DATA = dataIsJson ? JSON.parse(data) : data
    FirebaseController.createItemToList(pathOnDB, DATA, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonCreateUpdateClicked", data);
    });
  }

  function onButtonReadListClicked(params) {
    FirebaseController.readData(pathOnDB, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log('onButtonReadListClicked', data)
      setDataReceived(data)
    })
  }

  function onButtonDeleteClicked(params) {
    FirebaseController.deleteData(pathOnDB, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log('onButtonDeleteClicked', pathOnDB)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <textarea
          placeholder="pathOnDB"
          onChange={(event) => setPathOnDB(event.target.value)}
        />
        <textarea
          placeholder="data"
          onChange={(event) => setData(event.target.value)}
        />
        <br />
        <small>On get data: {JSON.stringify(dataReceived)}</small>
        <small>Data is json: </small>
        <input
          type="checkbox"
          onChange={(event) => setDataIsJson(event.target.value)}
        />
        <br />
        <button onClick={onButtonCreateUpdateClicked}>
          Create or Update data
        </button>
        <br />
        <button onClick={onButtonCreateItemListClicked}>
          Create item to list
        </button>
        <br />
        <button onClick={onButtonReadListClicked}>Read data</button>
        <br />
        <button onClick={onButtonDeleteClicked}>Delete data</button>
        <br />
      </header>
    </div>
  );
}

export default App;
