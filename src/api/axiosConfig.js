import axios from "axios";

export default axios.create({
    baseURL: 'https://movie-api-spring-boot.onrender.com',
    headers: {"ngrok-skip-browser-warning": "true"}
})

//baseURL: 'https://9c96-103-106-239-104.ap.ngrok.io'