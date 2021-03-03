import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemons from './Pokemons';



const PokemonList = () => {
    
    const [pokemonList, setPokemon] = useState([]);
    useEffect(() => {
        async function getPokemonList() {
            return await axios.get('https://pokeapi.co/api/v2/pokemon');
        }
        getPokemonList().then((res) => {
            const arr = []
            let response = res;
            console.log(response.data)
            if (response.data.results.length > 0) {

                response.data.results.forEach((element ,id)=> {
                    const Pokemon = {
                        name : '',
                        image : ''
                    }
                    Pokemon.name = element.name;
                    Pokemon.image = `https://pokeres.bastionbot.org/images/pokemon/${id+1}.png`;
                    arr.push(Pokemon)
                });
                setPokemon(() => {
                    return [arr]
                }
                )
            }
        }
        );


    }, []);

    return (<>
        <div className="container">
            <div className="row">
                {pokemonList.length > 0 ? (pokemonList[0].map((items, index) => {
                    return (
                        <Pokemons
                            pokemon={items.name}
                            key={index}
                            id={index + 1}
                            imgsrc={items.image}
                        />
                    );
                     })) : null

                    }


            </div>

        </div>
    </>);
}

export default PokemonList;
