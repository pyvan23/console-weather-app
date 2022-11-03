import { menu, pause, readInput } from "./helpers/inquirer.js";
import  { SearchCity }  from "./models/SearchCity.js";
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

        const city = await readInput('City: ')
        console.log(city)
        

        console.log('\nCity Info\n'.green)
        console.log('City: ')
        console.log('lon: ')
        console.log('lat: ')
        console.log('Min: ')
        console.log('Max: ')
        
    
      
      }
      if(op !== 0) await pause()


  } while (op !== 0);



};

main();

