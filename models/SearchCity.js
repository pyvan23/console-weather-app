import axios from "axios";

export class SearchCity {
  history = ["madrid,paris"];

  constructor() {
    //read DB
  }

  async city(place = "") {
    try {
      // console.log(`city: ${place}`);
      const resp = await axios.get("");
      console.log(resp.data);
    } catch (error) {
      return [];
    }
  }
}
