import axios from 'axios'

const service = axios.create({
    baseURL: window.apiUrl, // api的base_url
    timeout: 15000 // request timeout
})

service.interceptors.response.use(
    response => {
        const success = response.data.success
        if (success === true) {
            response.data = response.data.data;
            return Promise.resolve(response);
        } else {
            window.vm.$message.error('' + response.data.errorMSG);
            return Promise.reject(new Error('null'));
        }
    },
    error => {
        window.vm.$message.error('' + error);
        return Promise.reject(error)
    })

export default service
