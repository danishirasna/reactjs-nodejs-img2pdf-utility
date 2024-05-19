import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "components";
import { CustomRoutes } from "./custom";

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <CustomRoutes />
      </Suspense>
    </Router>
  )


}

export default AppRouter;