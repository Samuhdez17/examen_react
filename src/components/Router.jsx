import React,{ Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Serie from './Serie';
import NuevoPersonaje from './NuevoPersonaje';
import EditarPersonaje from './EditarPersonaje';
import Personajes from './Personajes';

export default class Router extends Component {
    render() {
        function SerieElement() {
            const { id } = useParams();
            return <Serie id={id} />;
        }

        function PersonajesElement() {
            const { id } = useParams();
            return <Personajes id={id} />;
        }

        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/serie/:id" element={<SerieElement />} />
                    <Route path="/personajes/:id" element={<PersonajesElement />} />
                    <Route path="/nuevo/" element={<NuevoPersonaje />} />
                    <Route path="/editar/" element={<EditarPersonaje />} />
                </Routes>
            </BrowserRouter>
        );
    }
}