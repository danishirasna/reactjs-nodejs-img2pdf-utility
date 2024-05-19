import React, { Component } from "react";
import { Navigate, Route, Switch } from "react-router-dom";
class DefaultLayout extends Component {

    render() {
        let screens = this.props.callback()
        return (
            <div className="app">
                <Routes>
                    {screens.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => <route.component {...props} />}
                            />
                        ) : null;
                    })}
                    <Navigate from="/" to="/" />
                </Routes>
            </div>
        )
    }
}


export default DefaultLayout;