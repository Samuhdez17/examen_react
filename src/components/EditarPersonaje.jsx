import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import PersonajesService from '../services/PersonajesService';
import { Navigate } from 'react-router-dom';

export default class EditarPersonaje extends Component {
    serviceSerie = new SeriesService()
    servicePersonaje = new PersonajesService()

    serieRef = React.createRef();
    personajeRef = React.createRef();

    state = {
        series: [],
        personajes: [],
        status: false,
    }

    cargarDatos = () => {
        try {
            this.serviceSerie.getSeries().then((res) => {
                let aux = res.data

                this.setState({
                    series: aux
                })
            })

            this.servicePersonaje.getPersonajes().then((res) => {
                let aux = res.data

                this.setState({
                    personajes: aux
                })
            })

        } catch (error) {
            throw error
        }
    }

    modificarPersonaje = (e) => {
        e.preventDefault();

        const serieId = this.serieRef.current.value;
        const personajeId = this.personajeRef.current.value;

        this.servicePersonaje.cambiarPersonajeSerie(personajeId, serieId).then((res) => {
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    render() {
        if (this.state.status) 
            return <Navigate to={'/personajes/' + this.serieRef.current.value} />

        else 
            return (
                <div>
                    <h1>Modificar personaje</h1>
                    <hr />

                    <form onSubmit={this.modificarPersonaje}
                    >

                        <label>Serie</label>
                        <select ref={this.serieRef}>
                            {
                                this.state.series.map((serie, i) => {
                                    return (
                                        <option key={i} value={serie.idSerie}>
                                            {serie.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <label>Personaje</label>
                        <select ref={this.personajeRef}>
                            {
                                this.state.personajes.map((personaje, i) => {
                                    return (
                                        <option key={i} value={personaje.idPersonaje}>
                                            {personaje.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <button>Editar personaje</button>
                    </form>
                </div>
            );
    }
}
