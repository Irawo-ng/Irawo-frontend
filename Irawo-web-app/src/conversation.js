import axios from 'axios';

export async function createConversation(message, role, category, scenarioTag, responseFormat) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authenticated')}`
            // 'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDczMzQ3OTMsImV4cCI6MTcwNzQyMTE5M30.3LXXclVNu_v_6VrbY7vO640fVz1zGvOmZpr1ZeyCv0A`
        };
        const requestBody = {
            message,
            role,
            category,
            scenarioTag,
            responseFormat
        };
        const response = await axios.post("https://irawo-backend.onrender.com/api/conversation/call", requestBody, { headers });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error;
    }
}



export async function getAllConversationsForUser() {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authenticated')}`
        };
        const response = await axios.get("https://irawo-backend.onrender.com/api/conversation/get", { headers })
        return response.data
    } catch (error) {
        return error
    }
}