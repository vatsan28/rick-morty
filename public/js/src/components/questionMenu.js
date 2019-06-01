import React, { Component } from 'react';
import { fetchResults, fetchInfo } from "../helpers/Api";

class QuestionMenu extends Component {
    handleq1 = e => {
        e.preventDefault();
        
        fetch(API_URL+"/character/?page=1", {method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const characters = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                this.props.loadCharacters(characters, resultInformation, "character");
            })
        });
    }

    render() {
        return (
            <div className = "twelve columns menu">
                <div className="three columns me q1">
                    <a href="/characters" onClick={this.handleq1} >BROWSE CHARACTERS</a>
                </div>
                <div className="three columns me">
                    <a href="#">FIND CHARACTERS BY LOCATION</a>
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