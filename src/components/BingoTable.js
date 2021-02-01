import React from "react";
import { Pokemons } from '../data/Pokemons';
import { shuffle } from '../utilities/helpers';

const BingoTable = () => {

  const [pokemonsArray, setPokemonsArray] = React.useState(shuffle(Pokemons));
  const [checkedArray, setCheckedArray] = React.useState([12]);
  const [renderAnimatedPokemons, setRenderAnimatedPokemons] = React.useState(false);
  const indexes = [0,1,2,3,4];

  React.useEffect(() => {
    if(checkForBingo()) {
        setRenderAnimatedPokemons(true);
    }
  },[checkedArray]);

  const renderTable = () => {
    return pokemonsArray.map((pokemon, i) => {
        return (
            <button 
            onClick={() => selectPokemon(i)}
            className={pokemon.checked || i === 12 ? 'active pokemon-btn' : 'pokemon-btn'}
            key={i}
            disabled={pokemon.checked || i === 12}
            >
                <img className="pokemon-img" src={pokemon.image} alt="pokemon-img"/>
            </button>
        )
    });
  }

  const getRowAndColumn = (index) => {
    return {
        row: parseInt(index /5),
        column: index % 5
    }
  }

  const selectPokemon = (i) => {
    setRenderAnimatedPokemons(false);
    const pokemons = [...pokemonsArray];
    const checkedPokemons = [...checkedArray];
    pokemons[i].checked = true;
    checkedPokemons.push(i);
    setPokemonsArray(pokemons);
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
    console.log(index % 4)
    if (index % 4 === 0) return indexes.every(index => checkedArray.includes(index * 5 + 4 - index));
    return false;
  }

  const checkForBingo = () => {
    const index = checkedArray[checkedArray.length - 1];
    const position = getRowAndColumn(index);
    return checkRow(position.row) || checkColumn(position.column) || checkRightDiagonal(index) || checkLeftDiagonal(index);
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
        <div className="pokemon-grid">
            {renderTable()}
        </div>
        {renderAnimatedPokemons && renderWinAnimation()}
    </>
  );
}

export default BingoTable;
