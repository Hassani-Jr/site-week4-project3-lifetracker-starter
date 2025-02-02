import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import apiClient from "../../services/apiClient";
import Navbar from "../Navbar/Navbar";

export default function Register({ user, setUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      }
    } else if (form.passwordConfirm && form.password === "") {
      setErrors((e) => ({
        ...e,
        passwordConfirm: "Password cannot be empty",
      }));
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else if (form.passwordConfirm && form.password === "") {
      setErrors((e) => ({
        ...e,
        passwordConfirm: "Password cannot be empty",
      }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }
    const { data, error } = await apiClient.signupUser({
      username: form.username,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      password: form.password,
    });
    if (data?.user) {
      setUser(data.user);
      apiClient.setToken(data.token);
      navigate("/me");
    }
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }

    setIsLoading(false);
  };

  return (
    <div className="Register">
      <div className="card">
        <div className="split-inputs">
          <div className="input-field">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="Wissam"
              value={form.first_name}
              onChange={handleOnInputChange}
            />
            {errors.first_name && (
              <span className="error">{errors.first_name}</span>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Doe"
              value={form.last_name}
              onChange={handleOnInputChange}
            />
            {errors.last_name && (
              <span className="error">{errors.last_name}</span>
            )}
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="username"
            placeholder="ABC123"
            value={form.username}
            onChange={handleOnInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@doe.io"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div>
        </div>

        <button
          className="registerBtn"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading..." : "Create Account"}
        </button>
        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
