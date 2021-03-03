import React, { useState } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Pokemons = (props) => {
    const [moves, setMoves] = useState([]);
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const getPokemonImage = () => {
        async function getPokemonImageById() {
            return await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.id}/`);
        }
        getPokemonImageById().then((res) => {
            setWeight(res.data.weight)
            setHeight(res.data.height)
            setMoves(() => {
                return [res.data.moves]
            })
            onOpenModal();
        })
    }
    return (
        <>
            <div className="col cards" onClick={getPokemonImage} data-toggle="modal" data-target="#exampleModalCenter">
                <div className="card" style={{ "width": "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.pokemon}</h5>
                        <img src={props.imgsrc} height="100px" width="100"/>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                    <div className="card">
                        <img src={props.imgsrc}/>
                            <div className="card-body">
                                <h5 className="card-title">{props.pokemon}</h5>
                                <p className="card-text">
                                    <b>Weight: </b>{weight}<br/>
                                    <b>Height: </b>{height}
                                    <ul>
                                        {moves.map((items,key) =>{
                                           return( items.map((i,k) =>{
                                                return(
                                                    <li key={k}>{i.move.name}</li>
                                                )
                                            })
                                        )})}
                                    </ul>
                                </p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                
            </Modal>
        </>
    );
}

export default Pokemons;