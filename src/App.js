import './App.css';
import React, { useState } from 'react';

async function readFile(){

  //Valid file and data?
  const res = await fetch('./address.csv');
  const data = await res.text();

  var table = [];
  let regex1 = /("[^",]+),([^",]+)?,([^"]+")/g; //Removes two commas
  let regex2 = /("[^",]+),([^"]+")/g; //Removes one comma between quotations
  let regex3 = /["]/g;  //Removes any quotations marks within the string

  const dataTable = data.split('\n').slice(); //Separates each new line
  dataTable.forEach(elem => {

    //Remove special characters
    elem = elem.replace(regex1,"$1 $2 $3");
    elem = elem.replace(regex1,"$1 $2 $3");

    elem = elem.replace(regex2,"$1 $2");
    elem = elem.replace(regex3,"");

    let col = elem.split(','); //Separates based on comma delimiter

    //Remove any empty cells
    col = col.filter(cell => {
      if(cell) { return true; } //All truthy values
      return false; 
    });
    
    //Finds columns that have more than 11 cells
    if(col.length > 11) {
      console.log(col);
    }

    //remove special characters and whitespace
    col = col.map(e => e.trim());

    table.push(col);
  });

  table.shift(); //Removes the initial template line

  //Removes empty subarrays
  table = table.map(record => {
    return record.filter(columns => {
      if(columns) { return true; } //All truthy values
      return false; 
    });
  });

  return table;
}

let table = [];
readFile().then(elem => { 
  table = Array.from(elem); 

  //Checks if all entries are equal in length
  let equal = false;
  table.forEach(elem => {
    if(elem.length == 11) { equal = true; }
  });

  if(equal) { console.log('All entries are equal in length.'); }
  else { console.log('Not all entries equal in length'); }
});

function App() {
  const [filterValue, setFilterValue] = useState('');
  const [filterType, setFilterType] = useState('City');
  const [displayTable, setDisplayTable] = useState(table);

  const [totalAddresses, setTotalAddresses] = useState(-1);

  function filter(){

    //Verify data before filtering
    console.log('Total Entries: ', displayTable.length);
    console.log('Filtered Value: ', filterValue, ' Type:', filterType);

    let filtered = displayTable.filter( row => {

        switch(filterType){
          case 'City': {
            if(!row[3]){
              return false;
            } 
            return (row[3].toLowerCase() === filterValue.toLowerCase())
          }
          case 'State': {
            if(row[4]){
              return (row[4].toLowerCase() === filterValue.toLowerCase());
            } 
            return false;            
          }
          case 'Country': {
            if(row[5]){
              return (row[5].toLowerCase() === filterValue.toLowerCase());
            } 
            return false;            
          }
          case 'ZIP': {
            if(row[6]){
              return (row[6].toLowerCase() === filterValue.toLowerCase());
            } 
            return false;            
          }
        }

        return false; //Match not found
    });

    filtered = filtered.filter(elem => elem.length > 0); //Removes empty arrays

    //Stringify each element and create new set to remove EXACT duplicates
    let finalTotal = new Set(
        filtered.map(elem => JSON.stringify(elem).toLowerCase())
      ).size;

    console.log(filtered);
    return finalTotal;
  }

  function handleSubmit(event){

    //Has the displayTable copied the data from the Promise?
    if(displayTable.length == 0) { 
      setDisplayTable(table); 
      console.log('Data still loading...');
    } else {
      let total = filter();
      console.log('Filtered Length:', total);
      setTotalAddresses(total);
    }

    event.preventDefault();
  }

  return (
    <div className="App">
      <div className="App-header">
      <h2></h2>
        <form onSubmit={handleSubmit}>
          <label>Filter Value: </label>
          <input 
            type="text" 
            required 
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <label> Filter: </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="City">City</option>
            <option value="State">State</option>
            <option value="Country">Country</option>
            <option value="ZIP">ZIP Code</option>
            
          </select>
          <br/>
          <button>Filter</button>

          <br/><br/>

          {(totalAddresses != -1) ? 
              <h3>Total Found Addresses: {totalAddresses}</h3> : ''}
        </form>
        

      </div>

    </div>
  );
}

export default App;
