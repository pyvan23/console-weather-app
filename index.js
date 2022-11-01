import { menu, readInput } from "./helpers/inquirer.js";

const main = async () => {
    console.clear()

    do {
      let  op = await menu();

    } while (op !== 0);



};

main();

