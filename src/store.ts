import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class UserData {
    data = []
    error = null

    constructor() {
        makeAutoObservable(this)
    }

  fetchData() {
    axios.get('http://localhost:3001/tableData')
      .then(response => {
        this.data = response.data
        console.log("Success");   
       })
      .catch(err => {
        this.error = err
      })
  };
}

export default new UserData;