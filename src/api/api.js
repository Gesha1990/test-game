import * as axios from "axios/index";

const instance = axios.create({
  baseURL: 'http://starnavi-frontend-test-task.herokuapp.com/',
  headers: {

  }
});

export const winnersAPI = {
  getWinners() {
    return instance.get('winners')
      .then(response => response.data)
  },
  getSettings() {
    return instance.get('game-settings')
      .then(response => response.data)
  },
  putWinner(winner, date) {
    return instance.post('winners', { winner, date})
      .then(response => response)
  }


}