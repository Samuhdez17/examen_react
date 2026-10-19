import React, { Component } from 'react';
import SeriesService from '../services/SeriesService';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
    service = new SeriesService();

    state = {
        series: [],
        dropdownOpen: false,
    }

    cargarSeries = () => {
        try {
            this.service.getSeries().then((res) => {
                let aux = res.data

                this.setState({
                    series: aux
                })

                console.log(res.data);
            })

            console.log(this.state.series);

        } catch (error) {
            throw error
        }
    }

    componentDidMount = () => {
        this.cargarSeries();
    }

    toggleDropdown = () => {
        this.setState(prev => ({
            dropdownOpen: !prev.dropdownOpen
        }));
    }

    render() {
        return (
            <nav class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-16">
                        {/* logo */}
                        <div class="flex-shrink-0 flex items-center">
                            <span class="text-xl font-bold text-blue-700">Navbar</span>
                        </div>

                        {/* menu */}
                        <div class="hidden sm:block sm:ml-6">
                            <ul class="flex space-x-4 text-gray-700 font-medium items-center">
                                <li className="hover:text-blue-600 px-3 py-2 rounded-md text-sm">
                                    <NavLink to='/'>Home</NavLink>
                                </li>
                                
                                <li className="hover:text-blue-600 px-3 py-2 rounded-md text-sm">
                                    <NavLink to='/nuevo/'>Nuevo personaje</NavLink>
                                </li>

                                <li className="hover:text-blue-600 px-3 py-2 rounded-md text-sm">
                                    <NavLink to='/editar/'>Modificar personaje</NavLink>
                                </li>

                                <li class="relative group">
                                    <button class="hover:text-blue-600 px-3 py-2 rounded-md text-sm flex items-center">
                                        Series
                                        <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                        </svg>
                                    </button>

                                    <ul
                                        class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                                        <li>
                                            {
                                                this.state.series.map((serie, i) => {
                                                    return (
                                                        <NavLink key={i} to={'/serie/' + serie.idSerie}
                                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                            {serie.nombre}
                                                        </NavLink>
                                                    )
                                                })
                                            }
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
