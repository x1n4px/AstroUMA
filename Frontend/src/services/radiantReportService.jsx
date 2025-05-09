import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('authToken');


export const saveReportAdvice = async (formData) => {
    try {
        const response = await axios.post(`${apiUrl}/radiant-report/advice`,  {formData} ,
            {
                headers: {
                    'x-token': token, // Agrega el token como encabezado x-token
                },
            }
        );
        console.log(response)
        return response.data;

    } catch (error) {
        throw error;
    }
};


export const getRadiantReport = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/radiant-report/${id}`, {
            headers: {
                'x-token': token, // Agrega el token como encabezado x-token
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

 


