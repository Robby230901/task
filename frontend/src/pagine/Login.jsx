// src/pagine/Login.jsx

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!email || !password) {
            setError("Compila tutti i campi");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Username o password non validi");
            } else {
                console.error("Login error:", error);
                setError("Errore durante il login");
            }

        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="/register" className="text-decoration-none">
                                Non hai un account? Registrati
                            </Link>
                        </div>
                    </form>
                    {error && <div className="alert alert-danger mt-2">{error}</div>}
                    {success && <div className="alert alert-success mt-2">Login avvenuto con successo</div>}
                </div>
            </div>
        </div>
    );
}

export default Login;