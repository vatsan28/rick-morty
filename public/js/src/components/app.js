import React, { Component } from "react";
import Header from "./Header";
import QuestionMenu from "./QuestionMenu";

import CharacterList from "./character/CharacterList";
import LocationList from "./location/LocationList";
import EpisodeList from "./episode/EpisodeList";

import NoCharacters from "./character/NoCharacters";

import CharacterPagination from "./character/CharacterPagination";
import EpisodePagination from "./episode/EpisodePagination";
import LocationPagination from "./location/LocationPagination";

import CharacterFilter from "./character/CharacterFilter";
import LocationFilter from "./location/LocationFilter";
import EpisodeFilter from "./episode/EpisodeFilter";

import { getNextPage } from "../helpers/Api";

class App extends Component {
    state = {
        characters: [],
        locations: [],
        episodes: [],
        pageInfo: {}
    }

    prepareCharacterPageInfo = (pageInfo, resource) => {
        const nextPage = this.parsePageUrl(pageInfo["next"]);
        const prevPage = this.parsePageUrl(pageInfo["prev"]);;
        const res = {
            characters: {
                totalPages: pageInfo.pages,
                nextPage,
                prevPage,
                filterName: ""
            },
            locations: {},
            episodes: {},
            currentApiResource: resource
        }
        return (res);
    }

    prepareNonCharacterPageInfo = (pageInfo, resource) => {
        console.log(resource);
        const nextPage = this.parsePageUrl(pageInfo["next"]);
        const prevPage = this.parsePageUrl(pageInfo["prev"]);
        var res;
        if (resource === "location") {
            res = {
                characters: {},
                locations: {
                    totalPages: pageInfo.pages,
                    nextPage,
                    prevPage,
                    filterName: "",
                    filterType: "",
                    filterDimension: ""
                },
                episodes: {},
                currentApiResource: resource
            }
        } else if (resource === "episode") {
            res = {
                characters: {},
                locations: {},
                episodes:{
                    totalPages: pageInfo.pages,
                    nextPage,
                    prevPage,
                    filterName: "",
                    code: ""
                },
                currentApiResource: resource
            }
        }
        console.log(res);
        return (res);
    }

    //To load state from the question menu.
    loadState = (state) => {
        var {characters, locations, episodes, pageInfo} = state;
        const resource = state.pageInfo.currentApiResource;
        pageInfo = (resource == "character") 
                    ? this.prepareCharacterPageInfo(pageInfo["characters"], resource)
                    : this.prepareNonCharacterPageInfo(pageInfo["nonCharacter"], resource) ;
        
        this.setState({characters, locations, episodes, pageInfo});
    }

    //To load characters from a location/episode.
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
        const nextPage = this.parsePageUrl(resultInformation["next"]);
        const prevPage = this.parsePageUrl(resultInformation["prev"]);
        
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
    
    loadNextSetLocations = (newLocations, resultInformation, currentApiResource) => {
        const nextPage = this.parsePageUrl(resultInformation["next"]);
        const prevPage = this.parsePageUrl(resultInformation["prev"]);
        
        this.setState({
            characters: [],
            locations: newLocations,
            episodes: [],
            pageInfo: {
                locations: {
                    totalPages: resultInformation["pages"],
                    nextPage,
                    prevPage,
                    filterName: resultInformation["filterName"],
                    filterType: resultInformation["filterType"],
                    filterDimension: resultInformation["filterDimension"]
                },
                characters : {},
                episodes: {},
                currentApiResource
            }
        });
    }

    loadNextSetEpisodes = (newEpisodes, resultInformation, currentApiResource) => {
        const nextPage = this.parsePageUrl(resultInformation["next"]);
        const prevPage = this.parsePageUrl(resultInformation["prev"]);
        
        this.setState({
            characters: [],
            locations: [],
            episodes: newEpisodes,
            pageInfo: {
                episodes: {
                    totalPages: resultInformation["pages"],
                    nextPage,
                    prevPage,
                    filterName: resultInformation["filterName"],
                    code: resultInformation["code"],
                },
                characters : {},
                locations: {},
                currentApiResource
            }
        });
    }

    render () {
        const isCharacterAvailable = this.state.characters.length >= 1;
        const isLocationAvailable = this.state.locations.length >= 1;
        const isEpisodeAvailable = this.state.episodes.length >= 1;
        
        const characterFilter = this.state.pageInfo.currentApiResource === "character";
        const locationFilter = this.state.pageInfo.currentApiResource === "location";
        const episodeFilter = this.state.pageInfo.currentApiResource === "episode";
        console.log(this.state);
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
                {   locationFilter 
                    ? <LocationFilter loadLocations={this.loadNextSetLocations} />
                    :  null
                }
                {   episodeFilter 
                    ? <EpisodeFilter loadEpisodes={this.loadNextSetEpisodes} />
                    :  null
                }
                {   isLocationAvailable
                    ? <React.Fragment>
                        <LocationPagination 
                            pageInfo={this.state.pageInfo} 
                            loadLocations={this.loadNextSetLocations} 
                        />
                        <LocationList 
                            locations={this.state.locations} 
                            pageInfo={this.state.pageInfo}  
                            addCharacterGroup={this.loadLocationCharacterGroup} 
                        />
                    </React.Fragment>
                    : null
                }
                {   isEpisodeAvailable
                    ? <React.Fragment>
                        <EpisodePagination 
                            pageInfo={this.state.pageInfo} 
                            loadEpisodes={this.loadNextSetEpisodes} 
                        />
                        <EpisodeList 
                            locations={this.state.episodes} 
                            pageInfo={this.state.pageInfo}  
                            addCharacterGroup={this.loadLocationCharacterGroup} 
                        />
                    </React.Fragment>
                    : null
                }
                {   isCharacterAvailable 
                    ?<React.Fragment>
                        <CharacterPagination 
                            pageInfo={this.state.pageInfo} 
                            loadCharacters={this.loadNextSetCharacters}
                            browseCharacterResults={characterFilter}
                            addCharacterGroup={this.loadLocationCharacterGroup}
                            />
                         <CharacterList 
                            characters = {this.state.characters} 
                            pageInfo={this.state.pageInfo} 
                            />
                    </React.Fragment>
                    : <NoCharacters />
                }
            </div>
        )
    }

    parsePageUrl = (data) => {
        return (data != "")
                    ? getNextPage(data)
                    : 0;
    }
}

export default App;