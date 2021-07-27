import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

async function readFile(){

  //Valid file and data?
  const res = await fetch('./address.csv');
  const data = await res.text();

  var table = [];

  const dataTable = data.split('\n').slice();  
  dataTable.forEach(elem => {
    const col = elem.split(',');
    let id = col[0];
    let contactID = col[1];
    let street = col[2];
    let city = col[3];
    let state = col[4];
    let country = col[5];
    let zip = col[6];
    let lat = col[7];
    let lng = col[8];
    let createdAt = col[8];
    let updatedAt = col[9];

    let total = [id, contactID, street, city, state, country, zip, lat, lng, createdAt, updatedAt];
    table.push(total);
  });

  return table;
}

let table = [];
readFile().then(elem => { table = Array.from(elem)});


function App() {

  //Set state of table
  const [displayTable, setDisplayTable] = useState(Array.from(table));

  //Sort the column
  function sort(column){

    let copy = Array.from(table);
    copy[0] = copy[column]; //Swaps value to the front 
    copy.sort(function(a,b){ //Sorts based on first value.
      return b[1] - a[1];
    });

    setDisplayTable(copy);
    console.log(copy[0]);
  };


  return (
    <div className="App">
      <header className="App-header">

      <button onClick={() => {sort(0)}}>ID</button>
      <button onClick={() => {sort(1)}}>ContactID</button>
      <button onClick={() => {sort(2)}}>Street</button>
      <button onClick={() => {sort(3)}}>City</button>
      <button onClick={() => {sort(4)}}>State</button>
      <button onClick={() => {sort(5)}}>Country</button>
      <button onClick={() => {sort(6)}}>ZIP</button>
      <button onClick={() => {sort(7)}}>Latitude</button>
      <button onClick={() => {sort(8)}}>Longitude</button>
      <button onClick={() => {sort(9)}}>CreatedAt</button>
      <button onClick={() => {sort(10)}}>UpdatedAt</button>

      {`  Size: ${displayTable.length}`}
      {displayTable.map(elem => {
        <h1>{elem[0]}</h1>
      })}


      </header>
    </div>
  );
}

export default App;
