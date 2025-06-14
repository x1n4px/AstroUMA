import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('authToken');



export const getReportZ = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/reportz/${id}`, {
            headers: {
                'x-token': localStorage.getItem('authToken'), // Agrega el token como encabezado x-token
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getReportZListFromRain = async(selectedCode, dateIn, dateOut, membershipThreshold, distanceThreshold) => {
    try {
        const response = await axios.post(`${apiUrl}/reportz/showerInfo/${selectedCode}/${dateIn === '' ? null : dateIn }/${dateOut === '' ? null : dateOut }`, {membershipThreshold, distanceThreshold},  {
            headers: {
                'x-token': token, // Agrega el token como encabezado x-token
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

 


