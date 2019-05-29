import React, { Component } from "react";
import Header from "./header";
import QuestionMenu from "./questionMenu";
import Answer from "./answer";

class App extends Component {
    render () {
        return (
            <div>
                <Header />
                <QuestionMenu />
                <Answer />
            </div>
        )
    }
}

export default App;