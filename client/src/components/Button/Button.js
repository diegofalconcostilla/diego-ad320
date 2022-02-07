import React from "react";
import './Button.css';

function Button(props) {
    return (
        <div>
            <button>{props.children}</button>
        </div>
    )
}

export default Button;