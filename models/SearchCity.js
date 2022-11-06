import axios from "axios";

export class SearchCity {
    history = ["madrid,paris"];

    constructor() {
        //read DB
    }

    get params() {
        return {
            access_token:
                process.env.MAPBOX_Key,
            limit: 5,
            language: "es",
        };
    }

    async city(place = "") {
        try {
            // console.log(`city: ${place}`);

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.params,
            });

            const resp = await instance.get();

            return resp.data.features.map(result => ({
                id: result.id,
                name: result.place_name_es,
                lng: result.center[0],
                lat: result.center[1],
            }))
        } catch (error) {
            throw new error(` ${place} does not exist }`)
            return [];
        }
    }
}
