import React, { Component } from 'react';
import { fetchResults, fetchInfo } from "../helpers/Api";

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

        //1. Make sure the existing results disapear.
        //2. Fetch all the locations and display cards.
        //3. When user clicks on a card, populate characters for that location in the character div. 
        // Lets do filters after this. Common roll it boy!
        fetch(API_URL+"/location/?page=1", {method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const location = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                console.log(location);
                const state = { 
                        characters: [],
                        locations: location,
                        pageInfo: {
                            characters: {},
                            locations: resultInformation,
                            currentApiResource: "location"
                        }
                };
                this.props.loadState(state);
            })
        });
        
    }

    render() {
        return (
            <div className = "twelve columns menu">
                <div className="three columns me q1">
                    <a href="#" onClick={this.handleq1} >BROWSE CHARACTERS</a>
                </div>
                <div className="three columns me">
                    <a href="#" onClick={this.handleq2}>FIND CHARACTERS BY LOCATION</a>
                </div>
                <div className="three columns me">
                    <a href="#" >FIND CHARACTERS BY EPISODE</a>
                </div>
                <div className="three columns me">
                        <a href="#">FIND CHARACTERS BY DIMENSION</a>
                    </div>
            </div>
        );
    }
}

export default QuestionMenu;