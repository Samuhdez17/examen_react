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

    componentDidUpdate = (oldProps) => {
        if (this.props.id !== oldProps.id) 
            this.service.getSerie(this.props.id).then((res) => {
                this.setState({
                    serie: res.data
                })
            })
    }

    render() {
        return (
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-6">
                        <img src={this.state.serie.imagen} alt="imagen serie" className="w-full h-96 object-cover rounded-lg shadow-lg" />
                        <h3 className="text-2xl font-bold text-gray-800">{this.state.serie.nombre}</h3>
                        <div className="text-gray-600 space-y-2">
                            <p><span className="font-medium">Año de salida:</span> { this.state.serie.anyo }</p>
                            <p><span className="font-medium">IMDB:</span> { this.state.serie.puntuacion }</p>
                        </div>
                        <NavLink to={`/personajes/${this.state.serie.idSerie}`} className="inline-block text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded hover:shadow-md transition">
                            Personajes
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}
