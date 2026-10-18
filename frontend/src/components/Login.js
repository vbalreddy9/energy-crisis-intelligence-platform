import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

   const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8080/api/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "role",
            response.data.role
        );

        localStorage.setItem(
            "email",
            response.data.email
        );

        alert("Login Successful");

        if(response.data.role === "ADMIN")
        {
            navigate("/dashboard");
        }
        else
        {
            navigate("/user-dashboard");
        }

    } catch (error) {

        console.error(error);
        alert("Invalid Credentials");
    }
};

    return (

        <div>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
    Login
</button>

<br /><br />

<p>
    New User?

    <button
        type="button"
        onClick={() => navigate("/register")}
    >
        Register
    </button>

</p>

</form>

        </div>
    );
}

export default Login;