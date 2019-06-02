import React, { Component } from 'react';
import { fetchResults, fetchInfo, buildUrl } from "../helpers/Api";

class QuestionMenu extends Component {
    handleq1 = e => {
        e.preventDefault();
        
        fetch(API_URL+"/character/?page=1", {method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const characters = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                console.log(characters);
                const state = { 
                    characters: characters,
                    locations: [],
                    episodes: [],
                    pageInfo: {
                        characters: resultInformation,
                        locations: {},
                        currentApiResource: "character"
                    }
            };
                this.props.loadState(state);
            })
        });
    }

    handleq2 = e => {
        e.preventDefault();
        const url = API_URL+"/location/?page=1";
        fetch(url, {method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const locations = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                console.log(location);
                const state = { 
                        characters: [],
                        locations,
                        episodes: [],
                        pageInfo: {
                            characters: {},
                            nonCharacter: resultInformation,
                            currentApiResource: "location"
                        }
                };
                this.props.loadState(state);
            })
        });
    }

    handleq3 = e => {
        e.preventDefault();
        const url = API_URL+"/episode/?page=1";
        fetch(url, {method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const episodes = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                console.log(episodes);
                const state = { 
                        characters: [],
                        locations: [],
                        episodes,
                        pageInfo: {
                            characters: {},
                            nonCharacter: resultInformation,
                            currentApiResource: "episode"
                        }
                };
                this.props.loadState(state);
            })
        });
    }

    render() {
        return (
            <div className = "twelve columns menu">
                <div className="four columns me q1">
                    <a href="#" onClick={this.handleq1} >BROWSE CHARACTERS</a>
                </div>
                <div className="four columns me">
                    <a href="#" onClick={this.handleq2}>FIND CHARACTERS BY LOCATION</a>
                </div>
                <div className="four columns me">
                    <a href="#" onClick={this.handleq3}>FIND CHARACTERS BY EPISODE</a>
                </div>
            </div>
        );
    }
}

export default QuestionMenu;