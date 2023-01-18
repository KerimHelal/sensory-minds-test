import React, { useEffect } from "react";
import { Pokemons } from '../data/Pokemons';
import { shuffle } from '../utilities/helpers';
import { Row } from 'react-bootstrap';


const BingoTable = () => {
  const [pokemonsArray, setPokemonsArray] = React.useState([]);
  const [checkedArray, setCheckedArray] = React.useState([12]);
  const [renderAnimatedPokemons, setRenderAnimatedPokemons] = React.useState(false);
  const indexes = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (checkForBingo()) {
      setRenderAnimatedPokemons(true);
    }
  }, [checkedArray]);

  useEffect(() => {
    setPokemonsArray(shuffle(Pokemons));
  }, [])

  const renderTable = () => {
    return pokemonsArray.map((pokemon, i) => {
      return (
        <button
          onClick={() => selectPokemon(i)}
          className={checkedArray.includes(i) ? 'active pokemon-btn' : 'pokemon-btn'}
          key={i}
          disabled={checkedArray.includes(i)}
        >
          <img className="pokemon-img" src={pokemon.image} alt="pokemon-img" />
        </button>
      )
    });
  }

  const getRowAndColumn = (index) => {
    return {
      row: parseInt(index / 5),
      column: index % 5
    }
  }

  const selectPokemon = (i) => {
    setRenderAnimatedPokemons(false);
    const checkedPokemons = [...checkedArray];
    checkedPokemons.push(i);
    setCheckedArray(checkedPokemons);
  }

  const checkRow = (row) => {
    return indexes.every(column => checkedArray.includes(row * 5 + column));
  }

  const checkColumn = (column) => {
    return indexes.every(row => checkedArray.includes(row * 5 + column));
  }

  const checkLeftDiagonal = (index) => {
    if (index % 6 === 0 || index === 0) return indexes.every(index => checkedArray.includes(index * 5 + index));
    return false;
  }

  const checkRightDiagonal = (index) => {
    if (index % 4 === 0) return indexes.every(index => checkedArray.includes(index * 5 + 4 - index));
    return false;
  }

  const checkForBingo = () => {
    const index = checkedArray[checkedArray.length - 1];
    const position = getRowAndColumn(index);
    return checkRow(position.row) || checkColumn(position.column) || checkRightDiagonal(index) || checkLeftDiagonal(index);
  }

  const resetPokemons = () => {
    setCheckedArray([12]);
    setPokemonsArray(shuffle(Pokemons));
  }

  const renderWinAnimation = () => {
    return (
      <>
        <img className="pokemon0" src="./images/pokemon1.png" alt="pokemon-ball" width={80} />
        <img className="pokemon1" src="./images/pokemon2.png" alt="pokemon-ball" width={80} />
        <img className="pokemon2" src="./images/pokemon3.png" alt="pokemon-ball" width={80} />
        <img className="pokemon3" src="./images/pokemon4.png" alt="pokemon-ball" width={80} />
        <img className="pokemon4" src="./images/pokemon5.png" alt="pokemon-ball" width={80} />
        <img className="pokemon5" src="./images/pokemon6.png" alt="pokemon-ball" width={80} />
        <img className="pokemon6" src="./images/pokemon1.png" alt="pokemon-ball" width={80} />
        <img className="pokemon7" src="./images/pokemon2.png" alt="pokemon-ball" width={80} />
        <img className="pokemon8" src="./images/pokemon3.png" alt="pokemon-ball" width={80} />
      </>
    );
  }



  return (
    <>
      <Row className="justify-content-center">

        <div className="pokemon-grid">
          {renderTable()}
        </div>
      </Row>
      <Row className="justify-content-center">
        <button
          onClick={() => resetPokemons()}
          className={'reset-btn'}
        >
          Reset
        </button>
      </Row>
      {renderAnimatedPokemons && renderWinAnimation()}
    </>
  );
}

export default BingoTable;
