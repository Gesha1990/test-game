import * as axios from 'axios/index'

const instance = axios.create({
  baseURL: ' https://60816d9073292b0017cdd833.mockapi.io/modes',
  headers: {

  }
})

export const gameAPI = {
  getSettings () {
    return instance.get()
      .then(response => response.data)
  }
}
