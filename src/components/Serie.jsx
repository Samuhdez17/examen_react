import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    service = new SeriesService();

    state = {
        serie: {},
    }

    componentDidMount = () => {
        this.service.getSerie(this.props.id).then((res) => {
            this.setState({
                serie: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <img src={this.state.serie.imagen} alt="imagen serie" />
                <h3> {this.state.serie.nombre} </h3>
                <h4>Año de salida: { this.state.serie.anyo } </h4>
                <h3>IMDB: { this.state.serie.puntuacion } </h3>

                <NavLink to={`/personajes/${this.state.serie.idSerie}`}>
                    Personajes
                </NavLink>
            </div>
        );
    }
}
