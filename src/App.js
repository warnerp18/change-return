import logo from './logo.svg';
import './App.css';


function getChange(amount, changeArray) {
  if(amount < 0 || Number.isInteger(amount) === false) {
    console.error(`amount passed must be a number greater than or equal to 0, passed: ${amount}`)
    throw new Error(`amount passed must be a number greater than or equal to 0, passed: ${amount}`);
  }
  if(!Array.isArray(changeArray) || changeArray.length <= 0) {
    console.error(`changeArray passed must be an array of integers and cannot be empty`)
    throw new Error(`changeArray passed must be an array of integers and cannot be empty`);
  }

  let currentTotal = 0;
  let amountRemainingToGive = amount - currentTotal;
  let changeObj = {}
  // sort array in case change not given in highest to lowest
  changeArray = changeArray.sort((a,b) => a > b ? -1: 1 )

  changeArray.forEach(change => {
    if(!Number.isInteger(change)) {
      console.error(`change must be an array of integers`);
      throw new Error(`change must be an array of integer`);
    }
    if(amountRemainingToGive === 0) {
      return;
    }

    const coins =  Math.floor(amountRemainingToGive/change);

    if(coins > 0) {
      changeObj[change] = coins;
      amountRemainingToGive-= (coins*change)
    }
  });

  if(amountRemainingToGive > 0) {
    throw new Error(`Unable to give correct change amount back: ${amountRemainingToGive} remians`)

  }
  return changeObj;
}




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export {App, getChange };
