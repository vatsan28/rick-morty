import React, { Component } from "react";
import Header from "./header";

class App extends Component {
    render () {
        return (
            <div>
                <Header />
                <div className="twelve columns">
                    Rick & Morty
                </div>
            </div>
        )
    }
}

export default App;