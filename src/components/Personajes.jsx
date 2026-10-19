import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    serviceSeries = new SeriesService();

    state = {
        serie: {},
        personajes: [],
    }

    cargarDatos = () => {
        this.serviceSeries.getSerie(this.props.id).then((res) => {
            this.setState({
                serie: res.data
            })
        })

        this.serviceSeries.getPersonajesSerie(this.props.id).then((res) => {
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
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Personajes de { this.state.serie.nombre }</h1>
                    <div className="mb-4">
                        <NavLink to={`/serie/${this.props.id}`} className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded hover:bg-blue-50">
                            Volver a serie
                        </NavLink>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    this.state.personajes.map((personaje, i) => {
                                        return (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-700">{ personaje.nombre }</td>
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <img src={ personaje.imagen } alt="imagen personaje" className="h-16 w-16 object-cover rounded" />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
