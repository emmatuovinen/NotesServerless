import React from "react";
import {Route} from "react-router-dom";

// Route component takes a prop called component that represents the component
// to be rendered when a matching route is found. We're sending childProps to 
// this component. Render method allows us to control what is passed into our
// component. This AppliedRoute component returns a route and takes a component
// and childProps prop so we can pass in the component what we want rendered. 
// We take the Component (C) and props(cProps) and render inside Route using
// the inline function: props is passed from Route component and cProps is the 
// childProps we want to set.
export default ({ component: C, props: cProps, ...rest}) => 
    <Route {...rest} render={props => <C {...props} {...cProps} />} />
