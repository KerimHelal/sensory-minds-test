import React from "react";
import { Pokemons } from '../data/Pokemons';


const BingoTable = () => {

  const [pokemonsArray, setPokemonsArray] = React.useState(Pokemons);
  const [checkedArray, setCheckedArray] = React.useState([12]);
  const [rightDiagonalChecked, setRightDiagonalChecked] = React.useState(false);
  const [leftDiagonalChecked, setLeftDiagonalChecked] = React.useState(false);
  /*const [renderAnimatedPokemons, setRenderAnimatedPokemons] = React.useState(false);*/

  const indexes = [0,1,2,3,4];

  /*React.useEffect(() => {
    if(checkForBingo()) {
        setRenderAnimatedPokemons(true);
    }
  },[checkedArray]);*/

  const renderTable = () => {
    return pokemonsArray.map((pokemon, i) => {
        return (
            <button 
            onClick={() => selectPokemon(i)}
            className={pokemon.checked ? 'active pokemon-btn' : 'pokemon-btn'}
            key={i}
            disabled={pokemon.checked}
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

  const checkLeftDiagonal = () => {
    if(!leftDiagonalChecked) {  
        const checked = indexes.every(index => checkedArray.includes(index * 5 + index));
        if(checked) {
          console.log('checked')
            setLeftDiagonalChecked(true);
            return true;
        }
    } 
    return false;
  }

  const checkRightDiagonal = () => {
    if(!rightDiagonalChecked) {  
        const checked = indexes.every(index => checkedArray.includes(index * 5 + 4 - index));
        if(checked) {
            setRightDiagonalChecked(true);
            return true;
        }
    } 
    return false;
  }

  const checkForBingo = () => {
    const index = checkedArray[checkedArray.length - 1];
    const position = getRowAndColumn(index);
    console.log(checkRightDiagonal())
    return checkRow(position.row) || checkColumn(position.column) || checkRightDiagonal() || checkLeftDiagonal();
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
        {checkForBingo() && renderWinAnimation()}
    </>
  );
}

export default BingoTable;
