import React, { useState, useEffect } from 'react';
import { SearchBox } from './components/search-box/search-box.component'
import { CardList } from './components/card-list/card-list.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // Getting the data and setting the same to the state via hooks
  useEffect(( )=> {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  console.log("Rendered");

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox
        className="search"
        onChangeHandler={onSearchChange}
        placeholder="Search Monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;