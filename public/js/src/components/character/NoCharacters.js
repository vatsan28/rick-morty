import React from "react";

const NoCharacters = (props) => {
    return <div className="twelve columns">
        <h3>
            No { props.resource } found.
        </h3>
    </div>
}

export default NoCharacters;