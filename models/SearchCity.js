import axios from "axios";
import { existsSync, readFileSync, writeFileSync } from "node:fs";


export class SearchCity {
    history = [];
    dbPath = './DB/dataBase.json'

    constructor() {
        this.readDB()
    }

    get paramsMapBox() {
        return {
            access_token:
                process.env.MAPBOX_Key,
            limit: 5,
            language: "es",
        };
    }
    get paramsWeather() {
        return {
            appid: process.env.OPONWEATHER_KEY,
            units: 'metric',


        };
    }

    async city(place = "") {
        try {
            // console.log(`city: ${place}`);

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox,
            });

            const resp = await instance.get();

            return resp.data.features.map(result => ({
                id: result.id,
                name: result.place_name_es,
                lat: result.center[1],
                lng: result.center[0],
            }))
        } catch (error) {

            throw new error(` ${place} does not exist }`)
            return [];
        }
    }

    async weather(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsWeather, lat, lon }

            });

            const resp = await instance.get();

            const { main, weather } = resp.data


            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }




        } catch (error) {

            console.log(error);
        }
    }

    historyPlaces(place = '') {

        if (this.history.includes(place.toLocaleLowerCase())) return

        this.history.unshift(place.toLocaleLowerCase())
        this.saveDB()
    }

    saveDB() {
        const payload = {
            histories: this.history
        }

        writeFileSync(this.dbPath, JSON.stringify(payload))
        
    }
    readDB() {

        if (!existsSync(this.dbPath)) {
            return null
        }
        const info = readFileSync(this.dbPath, { encoding: 'utf-8' })
        //parse string
        const data = JSON.parse(info)
        // console.log(data)
    
        return data

    }

}
