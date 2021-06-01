import { axiosClient } from "./axiosClient";

const UserApi = {
    async signin ({ email, password }){
        try {
            const response = await axios({
                url: `${apiUrl}/api/users/signin`,
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email,
                    password,
                },
            });
            if (response.statusText !== 'OK') {
                throw new Error(response.data.message);
            }
            return response.data;
        } catch (err) {
            console.log(err);
            return { error: err.response.data.message || err.message };
        }
    }
};
export default UserApi;
