import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.error(error);
            alert("Registration Failed");
        }
    };

    return (

        <div>

            <h2>User Registration</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;