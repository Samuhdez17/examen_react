import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import PersonajesService from '../services/PersonajesService';
import { Navigate } from 'react-router-dom';

export default class NuevoPersonaje extends Component {
    serviceSerie = new SeriesService()
    servicePersonaje = new PersonajesService()

    nombreRef = React.createRef();
    imagenRef = React.createRef();
    serieRef = React.createRef()

    state = {
        series: [],
        status: false,
    }

    cargarSeries = () => {
        try {
            this.serviceSerie.getSeries().then((res) => {
                let aux = res.data

                this.setState({
                    series: aux
                })
            })

        } catch (error) {
            throw error
        }
    }

    crearPersonaje = (e) => {
        e.preventDefault();

        const nombre = this.nombreRef.current.value;
        const imagen = this.imagenRef.current.value;
        const serieId = this.serieRef.current.value;

        const personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: serieId
        }

        try {
            this.servicePersonaje.crearPersonaje(personaje).then((res) => {
                this.setState({
                    status: true
                })
            })
        } catch (error) {
            throw error
        }
    }

    componentDidMount = () => {
        this.cargarSeries();
    }

    render() {
        if (this.state.status)
            return <Navigate to={'/personajes/' + this.serieRef.current.value} />

        else
            return (
                <div class="bg-white shadow-lg">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 class="text-2xl font-bold text-gray-800 mb-6">Crear personaje</h1>
                        <form onSubmit={this.crearPersonaje} class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                <input type="text" ref={this.nombreRef} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                                <input type="text" ref={this.imagenRef} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
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
                            <div class="flex items-center justify-between">
                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
    }
}