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
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}
