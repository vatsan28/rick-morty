import React, { Component } from "react";
import Header from "./Header";
import QuestionMenu from "./QuestionMenu";
import CharacterList from "./CharacterList";
import LocationList from "./LocationList";
import NoCharacters from "./NoCharacters";
import Pagination from "./Pagination";
import CharacterFilter from "./CharacterFilter";
import { getNextPage } from "../helpers/Api";

class App extends Component {
    state = {
        characters: [],
        locations: [],
        pageInfo: {}
    }

    prepareCharacterPageInfo = (pageInfo, resource) => {
        const nextPage = this.parseNextPage(pageInfo["next"]);
        const prevPage = nextPage == 0 ? 0 : nextPage - 2;
        const res = {
            characters: {
                totalPages: pageInfo.pages,
                nextPage,
                prevPage,
                filterName: ""
            },
            locations: {},
            currentApiResource: resource
        }
        return (res);
    }

    prepareNonCharacterPageInfo = (pageInfo, resource) => {
        const nextPage = this.parseNextPage(pageInfo["next"]);
        const prevPage = nextPage == 0 ? 0 : nextPage - 2;
        const res = {
            characters: {},
            locations: {
                totalPages: pageInfo.pages,
                nextPage,
                prevPage
            },
            currentApiResource: resource
        }
        return (res);
    }

    //To load state from the question menu.
    loadState = (state) => {
        var {characters, locations, pageInfo} = state;
        const resource = state.pageInfo.currentApiResource;
        pageInfo = (resource == "character") 
                    ? this.prepareCharacterPageInfo(pageInfo["characters"], resource)
                    : this.prepareNonCharacterPageInfo(pageInfo["locations"], resource) ;
        
        this.setState({characters, locations, pageInfo});
    }

    //To load characters from a location. Add the next and prev results in the character pagination.
    loadLocationCharacterGroup = (newCharacters, nextSetOfCharacters, prevSetOfCharacters, currSetOfCharacters) => {
        const characterPageInfo = {
            totalPages: null,
            nextPage: nextSetOfCharacters,
            prevPage: prevSetOfCharacters,
            currPage: currSetOfCharacters,
            filterName: null
        }

        const pageInfo = {...this.state.pageInfo};
        
        pageInfo["characters"] = characterPageInfo;
        this.setState({
            characters: newCharacters,
            pageInfo
        });
    }

    //To load the next/previous page characters.
    loadNextSetCharacters = (newCharacters, resultInformation, currentApiResource) => {
        const nextPage = this.parseNextPage(resultInformation["next"]);
        const prevPage = nextPage == 0 ? 0 : nextPage - 2;
        
        this.setState({
            characters: newCharacters,
            pageInfo: {
                characters: {
                    totalPages: resultInformation["pages"],
                    nextPage,
                    prevPage,
                    filterName: resultInformation["filterName"]
                },
                locations : {},
                currentApiResource
            }
        });
    }

    render () {
        const isCharacterAvailable = this.state.characters.length >= 1;
        const isLocationAvailable = this.state.locations.length >= 1;
        const characterFilter = this.state.pageInfo.currentApiResource === "character";
        
        return (
            <div>
                <Header />
                <QuestionMenu 
                    pageInfo={this.state.pageInfo} 
                    loadState={this.loadState}
                />
                {   characterFilter 
                    ? <CharacterFilter loadCharacters={this.loadNextSetCharacters} />
                    :  null
                }

                {   isLocationAvailable
                    ? <LocationList 
                        locations={this.state.locations} 
                        pageInfo={this.state.pageInfo}  
                        addCharacterGroup={this.loadLocationCharacterGroup} 
                        />
                    : null
                }
                {   isCharacterAvailable
                    ? <Pagination 
                        pageInfo={this.state.pageInfo} 
                        loadCharacters={this.loadNextSetCharacters}
                        browseCharacterResults={characterFilter}
                        addCharacterGroup={this.loadLocationCharacterGroup}
                        />
                    : null
                }
                {   isCharacterAvailable 
                    ? <CharacterList 
                        characters = {this.state.characters} 
                        pageInfo={this.state.pageInfo} 
                        />
                    : <NoCharacters />
                }
            </div>
        )
    }

    parseNextPage = (data) => {
        return (data != "")
                    ? getNextPage(data)
                    : 0;
    }
}

export default App;