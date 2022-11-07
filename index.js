import * as dotenv from "dotenv";
dotenv.config();

import { listPlaces, menu, pause, readInput } from "./helpers/inquirer.js";
import { SearchCity } from "./models/SearchCity.js";
import Color from "colors";

const main = async () => {
  console.clear();

  const searchCity = new SearchCity();

  let op;

  do {
    op = await menu();
    
    switch (op) {
      case 1:
        
        const place = await readInput("City: ");
        const places = await searchCity.city(place);
        const id = await listPlaces(places);
        if (id === '0') continue
        const selectPlace = places.find((p) => p.id === id);
        searchCity.historyPlaces(selectPlace.name)
        const descriptionWeather = await searchCity.weather(
          selectPlace.lat,
          selectPlace.lng
        );

        console.clear();

        console.log("\nCity Info\n".green);
        console.log(`Places: ${selectPlace.name}`);
        console.log(`lon: ${selectPlace.lng}`);
        console.log(`lat: ${selectPlace.lat}`);
        console.log(`Weather: ${descriptionWeather.description}`);
        console.log(`temperature: ${descriptionWeather.temp}`);
        console.log(`Min: ${descriptionWeather.min}`);
        console.log(`Max: ${descriptionWeather.max}`);

        break

      case 2:
        const history = searchCity.history.forEach((place, i) => {
          const idx = `${i + 1}`.green
          console.log(`${idx} ${place}`);

        })
        
        break
    }
    if (op !== 0) await pause();
  } while (op !== 0);
};

main();
