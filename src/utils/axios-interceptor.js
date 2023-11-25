import axios from 'axios';
import { useUsuarioStore } from '../stores/usuario-store';

export default function axiosInterceptor() {
    return function () {
        axios.interceptors.request.use(request => {
            const usuarioStore = useUsuarioStore();
            const token = usuarioStore.getToken() ?? usuarioStore.tokenTemporario;
        
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
        
            return request;            
        });
    }
}
