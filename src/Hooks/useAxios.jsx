import axios from 'axios';

//https://https://assignment-12-server-topaz-alpha.vercel.app/
//http://localhost:5000/
const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});

function useAxios() {
    return instance;
}

export default useAxios;