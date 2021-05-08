import axios from "axios";

const instance = axios.create({
    baseURL:"https://light-weight-baby.herokuapp.com"
})

export default instance;