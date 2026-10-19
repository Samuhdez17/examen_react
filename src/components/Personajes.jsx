import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    serviceSeries = new SeriesService();
    idSerie = this.props.id;

    state = {
        serie: {},
        personajes: [],
    }

    cargarDatos = () => {
        this.serviceSeries.getSerie(this.idSerie).then((res) => {
            this.setState({
                serie: res.data
            })
            console.log(this.state.serie);
            
        })

        this.serviceSeries.getPersonajesSerie(this.idSerie).then((res) => {
            this.setState({
                personajes: res.data
            })
        })
    }

    componentDidMount = () => {
        this.cargarDatos();
    }

    render() {
        return (
            <div>
                <h1>Personajes de { this.state.serie.nombre }</h1>
                <hr />
                <NavLink to={`/serie/${this.props.id}`}>
                    Volver a serie
                </NavLink>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personaje, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{ personaje.nombre }</td>
                                        <td><img src={ personaje.imagen } alt="imagen personaje" /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
