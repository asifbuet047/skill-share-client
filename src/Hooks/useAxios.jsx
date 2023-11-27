import axios from 'axios';

//https://
//http://localhost:5000/
const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});

function useAxios() {
    return instance;
}

export default useAxios;