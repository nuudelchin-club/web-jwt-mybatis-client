const API_BASE_URL = "http://localhost:8080";

export const reissueToken = async () => {
    const response = await fetch(`${API_BASE_URL}/token/reissue`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Token reissue failed:", errorText);
        return null;
    }

    const authHeader = response.headers.get("Authorization");
    return authHeader?.replace("Bearer ", "");
};

export const authFetch = async (url, options = {}) => {
    const token = await reissueToken();

    if (!token) {
        throw new Error("No access token available");
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response;
};
