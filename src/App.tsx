import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const testContext = createContext("test-string");
const contextWithDic = createContext({
  "count": -1,
  "handleClick": () => {}
})

function TestDisplay() {
  const text = useContext(testContext)
  return(
    <React.Fragment>
      <p>{text}</p>
      <testContext.Consumer>
        {value => <p>{value}</p>}
      </testContext.Consumer>
    </React.Fragment>
  )
}

function TestBotton() {
  const {count, handleClick} = useContext(contextWithDic)
  return(
    <React.Fragment>
      <button onClick={handleClick}>count up</button>
      <p>{count}</p>
      <contextWithDic.Consumer>
        {value => 
        <React.Fragment>
        <button onClick={value.handleClick}>count up</button>
        <p>{value.count}</p>
        </React.Fragment>
      }
      </contextWithDic.Consumer>
    </React.Fragment>
  )
}

function App() {
  const [ count, setCount ] = useState(0);
  const handleClick = () => {
    setCount(count+1)
  }
  const test = "replace string"
  return (
    <div className="App">
      {/* プロバイダーあり */}
      <testContext.Provider value={test}>
        <TestDisplay />
      </testContext.Provider>
      <contextWithDic.Provider value={{count, handleClick}} >
        <TestBotton />
      </contextWithDic.Provider>
      {/* プロバイダーなし */}
      <TestDisplay />
      <TestBotton />
    </div>
  );
}

export default App;
