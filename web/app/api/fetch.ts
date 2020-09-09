import axios from 'axios';
import endPoints from './endpoint';
import Log from '../utils/log';

class Fetch {
    static Axios<T>(url: string, options: any): Promise<T> {
        return axios(`${endPoints['production'].hostname}${url}`, options)
            .then((res) => {
                return Promise.resolve(res.data)
            })
            .catch((err) => {
                Log.error('Error in Axios', JSON.stringify(err));
                // console.log(err);
                return Promise.reject(err);
            })
    }
}

export default Fetch.Axios;