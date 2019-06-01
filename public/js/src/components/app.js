import React, { Component } from "react";
import Header from "./Header";
import QuestionMenu from "./QuestionMenu";
import CharacterList from "./CharacterList";
import NoCharacters from "./NoCharacters";
import Pagination from "./Pagination";
import CharacterFilter from "./CharacterFilter";
import { getNextPage } from "../helpers/Api";

class App extends Component {
    state = {
        characters: {},
        pageInfo: {}
    }

    loadCharacters = (characters, resultInformation, currentApiResource) => {
        const nextPage = (resultInformation["next"] != "")
                    ? getNextPage(resultInformation["next"])
                    : 0;
        const prevPage = nextPage == 0 ? 0 : nextPage - 2;
        this.setState({
            characters,
            pageInfo: {
                totalPages: resultInformation["pages"],
                nextPage,
                prevPage,
                currentApiResource
            }
        });
    }

    render () {
        const isCharacterAvailable = this.state.characters.length >= 1;
        const characterFilter = this.state.pageInfo.currentApiResource === "character";
        
        return (
            <div>
                <Header />
                <QuestionMenu pageInfo={this.state.pageInfo} loadCharacters={this.loadCharacters} />
                {characterFilter 
                    ? <CharacterFilter loadCharacters={this.loadCharacters} />
                    :  null
                }

                { isCharacterAvailable 
                    ? <Pagination pageInfo={this.state.pageInfo} loadCharacters={this.loadCharacters}/>
                    : null
                }
                { isCharacterAvailable 
                    ? <CharacterList characters = {this.state.characters} pageInfo={this.state.pageInfo} />
                    : <NoCharacters />
                }
            </div>
        )
    }
}

export default App;