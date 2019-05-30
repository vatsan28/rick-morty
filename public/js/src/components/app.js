import React, { Component } from "react";
import Header from "./header";
import QuestionMenu from "./questionMenu";
import CharacterList from "./characterList";
import NoCharacters from "./noCharacters";

class App extends Component {
    state = {
        questions: [
            "BROWSE CHARACTERS",
            "BROWSE CHARACTER BY LOCATION", 
            "BROWSE CHRACTER BY EPISODE", 
            "BROWSE CHARACTER BY DIMENSION"
        ],
        characters: {}
    }

    render () {
        const isCharacterAvailable = this.state.characters.length >= 1;
        return (
            <div>
                <Header />
                <QuestionMenu questions={this.state.questions} />
                { isCharacterAvailable ? <CharacterList /> : <NoCharacters /> }
            </div>
        )
    }
}

export default App;