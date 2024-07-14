import axios from "axios";
const AxiosLoader = axios.create({
    baseURL: 'http://localhost:5000'
});
export default AxiosLoader;
