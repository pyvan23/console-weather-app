import * as dotenv from 'dotenv'
dotenv.config()

import { listPlaces, menu, pause, readInput } from "./helpers/inquirer.js";
import { SearchCity } from "./models/SearchCity.js";
import Color from 'colors'

const main = async () => {

  console.clear()

  const searchCity = new SearchCity();


  let op

  do {

    op = await menu();
    console.log(op)
    switch (op) {

      case 1:

        const place = await readInput('City: ')
        const places = await searchCity.city(place)
        const id = await listPlaces(places)
        const selectPlace = places.find(p => p.id === id)
        const descriptionWeather = await searchCity.weather(selectPlace.lat, selectPlace.lng)


        console.log('\nCity Info\n'.green)
        console.log(`Places: ${selectPlace.name}`)
        console.log(`lon: ${selectPlace.lng}`)
        console.log(`lat: ${selectPlace.lat}`)
        console.log(`Weather: ${descriptionWeather.description}`)
        console.log(`temperature: ${descriptionWeather.temp}`);
        console.log(`Min: ${descriptionWeather.min}`)
        console.log(`Max: ${descriptionWeather.max}`)



    }
    if (op !== 0) await pause()


  } while (op !== 0);



};

main();

