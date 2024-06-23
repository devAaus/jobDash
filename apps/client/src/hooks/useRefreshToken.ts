import axios from "axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            if (!auth || !auth?.refreshToken) {
                throw new Error('Refresh token not found');
            }
            const refreshToken = auth?.refreshToken;

            const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/refresh-token`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    withCredentials: true,
                }
            );

            const { accessToken, refreshToken: newRefreshToken, role } = res.data;
            const newAuthData = { accessToken, refreshToken: newRefreshToken, role };
            localStorage.setItem('auth', JSON.stringify(newAuthData));
            setAuth(newAuthData);

            return accessToken;
        } catch (error) {
            console.error("Failed to refresh token", error);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;
