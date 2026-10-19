import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import PersonajesService from '../services/PersonajesService';
import { Navigate } from 'react-router-dom';

export default class EditarPersonaje extends Component {
    serviceSerie = new SeriesService()
    servicePersonaje = new PersonajesService()

    serieRef = React.createRef();
    personajeRef = React.createRef()

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
                <div class="bg-white shadow-lg">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 class="text-2xl font-bold text-gray-800 mb-6">Modificar personaje</h1>
                        <form onSubmit={this.modificarPersonaje} class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Serie</label>
                                <select ref={this.serieRef} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Personaje</label>
                                <select ref={this.personajeRef} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                            </div>
                            <div class="flex items-center justify-between">
                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Editar personaje
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
    }
}