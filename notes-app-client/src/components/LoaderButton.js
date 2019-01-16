import React from "react";
import {Button, Glyphicon} from "react-bootstrap";
import "./LoaderButton.css";

//this component takes an isLoading flag and the text that the button displays
// in the two different states
export default ({
    isLoading,
    text,
    loadingText,
    className = "",
    disabled = false,
    ...props
}) => 
    <Button 
        className={`LoaderButton ${className}`}
        disabled={disabled || isLoading} //ensuring button is disabled when isLoading is true
        {...props}
    >
        {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
        {!isLoading ? text : loadingText}

    </Button>;