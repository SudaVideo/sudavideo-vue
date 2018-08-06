import axios from 'axios'

const service = axios.create({
    // baseURL: "http://localhost:8080/video/", // api的base_url
    baseURL: "http://74.120.171.77/video/", // api的base_url
    // baseURL: "https://sudamod.download/video/", // api的base_url
    timeout: 10000 // request timeout
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
