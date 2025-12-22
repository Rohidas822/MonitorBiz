// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // 👉 In real app: call login API here
    login(formData);
    navigate("/dashboard");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoStyle}>🌸</div>

        {/* Title */}
        <h1 style={titleStyle}>Welcome Back</h1>

        {/* Subtitle */}
        <p style={subtitleStyle}>
          Login to continue accessing your dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              style={{
                ...inputStyle,
                border: errors.email
                  ? "1px solid #EF4444"
                  : "1px solid #E5E7EB",
              }}
            />
            {errors.email && <p style={errorText}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Password *</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{
                  ...inputStyle,
                  paddingRight: "48px",
                  border: errors.password
                    ? "1px solid #EF4444"
                    : "1px solid #E5E7EB",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
            {errors.password && <p style={errorText}>{errors.password}</p>}
          </div>

          {/* Remember & Forgot */}
          <div style={optionsRow}>
            <label style={rememberStyle}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                style={{ accentColor: "#FF6B00" }}
              />
              Remember me
            </label>

            <span
              onClick={() =>
                alert("Forgot password feature coming soon!")
              }
              style={forgotStyle}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button type="submit" style={submitButton}>
            Log In
          </button>
        </form>

        {/* Divider */}
        <div style={dividerStyle}>
          <div style={dividerLine}></div>
          <span style={dividerText}>Or continue with</span>
          <div style={dividerLine}></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => alert("Google login not implemented yet.")}
          style={googleButton}
        >
          <svg width="20" height="20" viewBox="0 0 256 256">
            <path fill="#4285F4" d="M227.9 130.1c0-7.8-1.5-15.3-4.2-22.3H128v43.3h55.4c-1.6 8.4-6.4 15.9-13.5 21.2v32.5h26.1c22.7-23.4 22.7-54.8 0-78.2z" />
            <path fill="#34A853" d="M128 232c30.7 0 56.5-10.2 75.8-27.6l-26.1-20.2c-10.8 7.3-24.8 11.8-49.7 11.8-37.7 0-69.4-25-80.9-58.7H45.1v33.7c25.1 49.9 76.4 82 130.9 82z" />
            <path fill="#FBBC05" d="M47.1 145.8c-2.7-8.1-4.2-16.8-4.2-25.8s1.4-17.7 4.2-25.8v-33.7h-22C11.4 87.7 4 115.8 4 146s7.4 58.3 20.8 85.5l22.3-33.7z" />
            <path fill="#EA4335" d="M128 55.8c17.5 0 33.4 6 46.2 17.7L196 52.3C171.2 28.8 139.4 16 128 16c-54.5 0-105.8 32.1-130.9 82l22.2 33.7c11.5-33.7 43.2-58.7 80.9-58.7z" />
          </svg>
          Login with Google
        </button>

        {/* Register */}
        <p style={footerText}>
          Don’t have an account?{" "}
          <span style={linkStyle} onClick={() => navigate("/register")}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

/* ---------------- Styles ---------------- */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: 20,
  backgroundColor: "#FFFFFF",
};

const cardStyle = {
  backgroundColor: "#FFFFFF",
  padding: 40,
  borderRadius: 16,
  width: 420,
  maxWidth: "100%",
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  textAlign: "center",
};

const logoStyle = { fontSize: 48, marginBottom: 16 };
const titleStyle = { fontSize: 28, fontWeight: 700, color: "#1F2937" };
const subtitleStyle = { color: "#6B7280", marginBottom: 32 };

const labelStyle = {
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 6,
  color: "#1F2937",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  fontSize: 15,
  outline: "none",
};

const eyeButtonStyle = {
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const errorText = { color: "#EF4444", fontSize: 13, marginTop: 6 };

const optionsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
};

const rememberStyle = { display: "flex", gap: 8, fontSize: 14 };
const forgotStyle = { fontSize: 14, color: "#FF6B00", cursor: "pointer" };

const submitButton = {
  width: "100%",
  padding: 14,
  backgroundColor: "#FF6B00",
  color: "#FFFFFF",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  margin: "28px 0",
};

const dividerLine = { flex: 1, height: 1, backgroundColor: "#E5E7EB" };
const dividerText = { margin: "0 16px", color: "#9CA3AF", fontSize: 14 };

const googleButton = {
  width: "100%",
  padding: 14,
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  cursor: "pointer",
  marginBottom: 24,
};

const footerText = { fontSize: 15, color: "#6B7280" };
const linkStyle = { color: "#FF6B00", fontWeight: 600, cursor: "pointer" };

export default Login;
