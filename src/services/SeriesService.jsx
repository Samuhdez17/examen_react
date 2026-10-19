import axios from 'axios';
import Global from '../Global';

export default class SeriesService {
    getSeries() {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Series/'
        
                axios.get(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        }) 
    }

    getSerie(id) {
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Series/' + id
        
                axios.get(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        }) 
    }

    getPersonajesSerie(id) { 
        return new Promise(function(resolve, reject) {
            try {
                let url = Global.api
                let request = 'api/Series/PersonajesSerie/' + id
        
                axios.get(url + request)
                .then((res) => {
                    resolve(res)
                })
        
            } catch (error) {
                reject(error)
            }
        }) 
    }
}
