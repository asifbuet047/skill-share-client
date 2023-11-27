import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
});

function useAxiosSecure() {

    return instance;
}

export default useAxiosSecure