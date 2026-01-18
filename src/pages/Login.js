import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { login, user} = useAuth();
    const navigate = useNavigate();

console.log("Current User:", user);

    const handleLogin = (e) => {
        onLogin(e);
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const username = "user";
            const password = "1234";

            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                credentials: "include",
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const authHeader = response.headers.get("Authorization");
                const accessToken = authHeader?.replace("Bearer ", "");
                console.info("Access Token:", accessToken)

                login({ name: username });
                navigate("/");
            }

        } catch (error) { 
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
