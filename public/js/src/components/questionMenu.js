import React, { Component } from 'react';
import { fetchResults, fetchInfo, makeAPICall } from "../helpers/Api";

class QuestionMenu extends Component {
    handleq1 = e => {
        e.preventDefault();
        
        var url="/character/";
        var queryParams = {page: 1};

        makeAPICall(url, queryParams, "get")
            .then(result => {
                var {resourceResults, resultInformation} = result;
                const state = { 
                    characters: resourceResults,
                    locations: [],
                    episodes: [],
                    pageInfo: {
                        characters: resultInformation,
                        locations: {},
                        currentApiResource: "characters"
                    }
                };
                this.props.loadState(state);
            })
            .catch(error => {
                console.log(error);
                const resp = error==404? "no data" : "Error with the API";
                console.log(resp);
                this.props.handleError(error, "characters");
            });
    }

    handleq2 = e => {
        e.preventDefault();

        var url="/location/";
        var queryParams = {page: 1};

        makeAPICall(url, queryParams, "get")
            .then(result => {
                var {resourceResults, resultInformation} = result;
                const state = { 
                    characters: [],
                    locations: resourceResults,
                    episodes: [],
                    pageInfo: {
                        characters: {},
                        nonCharacter: resultInformation,
                        currentApiResource: "locations"
                    }
            };
                this.props.loadState(state);
            })
            .catch(error => {
                console.log(error);
                const resp = error==404? "no data" : "Error with the API";
                console.log(resp);
                this.props.handleError(error, "locations");
            });
    }

    handleq3 = e => {
        e.preventDefault();

        var url="/episode/";
        var queryParams = {page: 1};

        makeAPICall(url, queryParams, "get")
            .then(result => {
                var {resourceResults, resultInformation} = result;
                const state = { 
                    characters: [],
                    locations: [],
                    episodes: resourceResults,
                    pageInfo: {
                        characters: {},
                        nonCharacter: resultInformation,
                        currentApiResource: "episodes"
                    }
            };
                this.props.loadState(state);
            })
            .catch(error => {
                console.log(error);
                const resp = error==404? "no data" : "Error with the API";
                console.log(resp);
                this.props.handleError(error, "episodes");
            });
    }

    render() {
        return (
            <div className = "twelve columns menu">
                <div className="four columns me q1">
                    <a href="#" id="q1" onClick={this.handleq1} >BROWSE CHARACTERS</a>
                </div>
                <div className="four columns me">
                    <a href="#" id="q2" onClick={this.handleq2}>FIND CHARACTERS BY LOCATION</a>
                </div>
                <div className="four columns me">
                    <a href="#" id="q3" onClick={this.handleq3}>FIND CHARACTERS BY EPISODE</a>
                </div>
            </div>
        );
    }
}

export default QuestionMenu;