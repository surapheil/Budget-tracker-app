import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import axios from "axios";



export default function Login({ setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const API_URL = "https://script.google.com/macros/s/AKfycbzbzL0GlyAiIjpuyKBgqtFhd3KCIJ3qyHKwq2kiKHz3f9NwSyUB-gm5vyzW09Wb8Tha/exec";
  const handleLogin = async () => {
    try {
      const res = await fetch(
        `/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      const data = await res.json();

      console.log(data);

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
        
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 font-semibold">
            LOGO
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-center text-lg font-semibold">
          Daily Budget Tracker
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please login to your account
        </p>

        {/* EMAIL */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Email / Username"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <button className="text-gray-500">Forgot Password?</button>
        </div>

        {/* LOGIN BUTTON */}
        <button 
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          LOGIN
        </button>

        {/* VERSION */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Version 1.0.0
        </p>

      </div>
    </div>
  );
}