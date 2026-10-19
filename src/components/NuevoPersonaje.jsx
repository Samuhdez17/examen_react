import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import PersonajesService from '../services/PersonajesService';
import { Navigate } from 'react-router-dom';

export default class NuevoPersonaje extends Component {
    serviceSerie = new SeriesService()
    servicePersonaje = new PersonajesService()

    nombreRef = React.createRef();
    imagenRef = React.createRef();
    serieRef = React.createRef();

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
                <div>
                    <h1>Crear personaje</h1>
                    <hr />
                    <form onSubmit={this.crearPersonaje}
                    >
                        <label>Nombre</label>
                        <input type="text" ref={this.nombreRef} />

                        <label>Imagen</label>
                        <input type="text" ref={this.imagenRef} />

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

                        <button>Crear</button>
                    </form>
                </div>
            );
    }
}
