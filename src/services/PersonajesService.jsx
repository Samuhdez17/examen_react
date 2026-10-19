import axios from 'axios';
import Global from '../Global';

export default class PersonajesService {
    getPersonajes() {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Personajes/'
        
                axios.get(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        }) 
    }

    getPersonaje(id) {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Personajes/' + id
        
                axios.get(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        }) 
    }

    cambiarPersonajeSerie(idPer, idSerie) {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Personajes/' + idPer + '/' + idSerie
        
                axios.put(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        })
    }

    crearPersonaje(personaje) {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Personajes/'
                axios.post(url + request, personaje)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}
