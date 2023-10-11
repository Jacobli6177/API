import React, { useState } from 'react';
import './App.css';
import pokedexJson from './Components/pokedex.json';

function App() {
  const [banList, setBanList] = useState([]);
  const [discoveredList, setDiscoveredList] = useState([]);
  const [discoveredImages, setDiscoveredImages] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);

  const addToBanList = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const RandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokedexJson.length);
    const isBanned = banList.some(attribute => {
      return (
        attribute === pokedexJson[randomIndex].type ||
        attribute === pokedexJson[randomIndex].species ||
        attribute === pokedexJson[randomIndex].profile.height ||
        attribute === pokedexJson[randomIndex].profile.weight
      );
    });
  
    if (isBanned) {
      RandomPokemon(); // Re-select if any attribute is in ban list
    } else {
      setRandomIndex(randomIndex);
    }
  }

  const DiscoverCurrentPokemon = () => {
    if (randomIndex !== null) {
      setDiscoveredList([...discoveredList, pokedexJson[randomIndex].name.english]);
      setDiscoveredImages([...discoveredImages, pokedexJson[randomIndex].image.hires]);
    }
    RandomPokemon(); // This line triggers the randomization for the next Pokemon
  }

  return (
    <div className='whole-page'>
      <div className='discovered'>
        <h1>Discovered Pokémon</h1>
        <ul>
          {discoveredList.map((pokemon, index) => (
            <li key={index}>
              {pokemon}
              <img src={discoveredImages[index]} alt={pokemon} />
            </li>
          ))}
        </ul>
      </div>
      <div className='info'>
        <h1>Try it out</h1>
        <h3>Discover your own List now</h3>
        <div className='info-container'>
          {randomIndex !== null && (
            <>
              <h2>{pokedexJson[randomIndex].name.english}</h2>
              <div className='box'>
                <img src={pokedexJson[randomIndex].image.hires} alt={pokedexJson[randomIndex].name.english} />
              </div>
              <button className="attribute-buttons" type='button' onClick={() => addToBanList(pokedexJson[randomIndex].type)}>Type: {pokedexJson[randomIndex].type}</button>
              <button className="attribute-buttons" type='button' onClick={() => addToBanList(pokedexJson[randomIndex].species)}>Species: {pokedexJson[randomIndex].species}</button>
              <button className="attribute-buttons" type='button' onClick={() => addToBanList(pokedexJson[randomIndex].profile.height)}>Height: {pokedexJson[randomIndex].profile.height}</button>
              <button className="attribute-buttons" type='button' onClick={() => addToBanList(pokedexJson[randomIndex].profile.weight)}>Weight: {pokedexJson[randomIndex].profile.weight}</button>
            </>
          )}
          <br />
          <button className="discover-button" type='button' onClick={DiscoverCurrentPokemon}>
            Discover
          </button>
        </div>
      </div>
      <div className='ban'>
        <h1>Ban List</h1>
        <div className="ban-buttons">
          {banList.map((attribute, index) => (
            <button key={index} className="ban-button">
              {attribute}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
