


// import React, { createContext, useEffect, useState, useContext } from 'react';
// import { loginUser } from '../api/api';

// const AuthContext = createContext();

// // Utility to fix relative image URL
// const fixUserImage = (user) => {
//   if (user?.profileImage && !user.profileImage.startsWith('http')) {
//     return {
//       ...user,
//       profileImage: `http://localhost:5678${user.profileImage}`,
//     };
//   }
//   return user;
// };

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

 
//    useEffect(() => {
//   const storedToken = localStorage.getItem('token');
//   const storedUser = localStorage.getItem('user');
//   if (storedToken && storedUser) {
//     const parsedUser = JSON.parse(storedUser);
//     if (parsedUser.profileImage && !parsedUser.profileImage.startsWith('http')) {
//       parsedUser.profileImage = `http://localhost:5678${parsedUser.profileImage}`;
//     }
//     setToken(storedToken);
//     setUser(parsedUser);
//   }
//   setAuthLoading(false);
// }, []);


//   // const login = async (email, password) => {
//   //   try {
//   //     const res = await loginUser(email, password);
//   //     const { token, user } = res.data;
//   //     const fixedUser = fixUserImage(user); // ✅ Patch here

//   //     setToken(token);
//   //     setUser(fixedUser);
//   //     localStorage.setItem('token', token);
//   //     localStorage.setItem('user', JSON.stringify(fixedUser));
//   //     return true;
//   //   } catch (err) {
//   //     console.error('Login failed:', err);
//   //     return false;
//   //   }
//   // };
//   const login = async (email, password) => {
//   try {
//     const res = await loginUser(email, password);
//     const { token, user } = res.data;

//     // FIX: Ensure full image URL
//     if (user.profileImage && !user.profileImage.startsWith('http')) {
//       user.profileImage = `http://localhost:5678${user.profileImage}`;
//     }

//     setToken(token);
//     setUser(user);
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user)); // ✅ Store with full URL

//     return true;
//   } catch (err) {
//     console.error('Login failed:', err);
//     return false;
//   }
// };


//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     window.location.href = '/';
//   };

//   const updateUser = (newData) => {
//   const updated = { ...user, ...newData };

//   // FIX: full URL on update
//   if (updated.profileImage && !updated.profileImage.startsWith('http')) {
//     updated.profileImage = `http://localhost:5678${updated.profileImage}`;
//   }

//   setUser(updated);
//   localStorage.setItem('user', JSON.stringify(updated));
// };


//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, setUser, updateUser, authLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);







// import React, { createContext, useContext, useEffect, useState } from "react";
// import { loginUser, registerUser } from "../api/api";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const API_BASE = process.env.REACT_APP_API_BASE_URL;

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
//   const [token, setToken] = useState(() => localStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fixUserImage = (user) => {
//     if (user?.profileImage && !user.profileImage.startsWith("http")) {
//       return {
//         ...user,
//         profileImage: `${API_BASE}${user.profileImage}`,
//       };
//     }
//     return user;
//   };

//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await loginUser(email, password);
//       const { token, user } = response;
//       if (user.profileImage && !user.profileImage.startsWith("http")) {
//         user.profileImage = `${API_BASE}${user.profileImage}`;
//       }
//       setUser(user);
//       setToken(token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (formData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await registerUser(formData);
//       const { token, user } = response;
//       if (user.profileImage && !user.profileImage.startsWith("http")) {
//         user.profileImage = `${API_BASE}${user.profileImage}`;
//       }
//       setUser(user);
//       setToken(token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const updateUser = (updatedUser) => {
//     let updated = updatedUser;
//     if (updated.profileImage && !updated.profileImage.startsWith("http")) {
//       updated.profileImage = `${API_BASE}${updated.profileImage}`;
//     }
//     setUser(updated);
//     localStorage.setItem("user", JSON.stringify(updated));
//   };

//   useEffect(() => {
//     if (user) {
//       setUser(fixUserImage(user));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         login,
//         register,
//         logout,
//         loading,
//         error,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  loginUser,
  registerUser,
} from '../apis/api'; // Import all your API functions here

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Fix image URL for profile
const fixUserImage = (user) => {
  if (user?.profileImage && !user.profileImage.startsWith('http')) {
    return {
      ...user,
      profileImage: `https://excel-analytics-plateform-backend.onrender.com${user.profileImage}`,
    };
  }
  return user;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? fixUserImage(JSON.parse(storedUser)) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(email, password);
      const fixedUser = fixUserImage(res.data.user);
      setUser(fixedUser);
      localStorage.setItem('user', JSON.stringify(fixedUser));
    } catch (err) {
      console.error('Login failed:', err);
      setError(
        err?.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError('');
    try {
      const res = await registerUser(userData);
      const fixedUser = fixUserImage(res.data.user);
      setUser(fixedUser);
      localStorage.setItem('user', JSON.stringify(fixedUser));
    } catch (err) {
      console.error('Registration failed:', err);
      setError(
        err?.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    // Optional: auto-refresh session logic
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

