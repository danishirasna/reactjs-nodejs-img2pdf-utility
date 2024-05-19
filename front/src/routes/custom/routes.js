import React from "react";
const Home = React.lazy(() => import("../../pages/file-upload/FileUploadDownload"));
const login = React.lazy(() => import("../../pages/Landing"));


export const customRoutes = [
    { path: "/", exact: true, name: "file", component: Home, authenticated: true },
    { path: "/file", exact: true, name: "file", component: Home, authenticated: true },
    { path: "/", exact: true, name: "login", component: login, authenticated: false },
    { path: "/login", exact: true, name: "login", component: login, authenticated: false },    
];
