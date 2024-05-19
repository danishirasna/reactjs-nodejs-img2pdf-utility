// src/routes/custom.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { customRoutes } from "./routes"
import { useAuth } from "../../context/AuthContext";

export const CustomRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {customRoutes.map((route, idx) => {
                return (
                    route?.component && route.authenticated === isAuthenticated ? (
                        <Route
                            key={idx}
                            path={route.path}
                            element={<route.component />}
                        />
                    ) : null
                );
            })}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/file" : "/login"} />} />
        </Routes>
    );
};
