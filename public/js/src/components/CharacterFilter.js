import React, { Component } from 'react';
import { fetchResults, fetchInfo } from "../helpers/Api";

class CharacterFilter extends Component {
    characterNameRef = React.createRef();
    characterIdRef = React.createRef();
    filterFormRef = React.createRef();

    // componentDidUpdate = () => {
    //     this.characterNameRef.current.value = "";
    //     this.characterIdRef.current.value = "";
    // }

    handleSearchFilter = e => {
        e.preventDefault();
        const characterName = this.characterNameRef.current.value;
        const characterId = this.characterIdRef.current.value;

        if (characterId === "" && characterName != "") {
            fetch(API_URL+"/character/?page=1&name="+characterName, {method: 'get'})
                .then((response) => {
                    response.json().then((responseJson) => {
                    console.log("Ok we are doing a good job here", responseJson);
                    const characters = fetchResults(responseJson);
                    const resultInformation = fetchInfo(responseJson);
                    this.props.loadCharacters(characters, resultInformation, "character");
                })
            });
        } else if (characterName === "" && characterId != "") {
            fetch(API_URL+"/character/"+characterId+"/?page=1"+characterName, {method: 'get'}).then((response) => {
                response.json().then((responseJson) => {
                    console.log("Ok we are doing a good job here", responseJson);
                    const characters = fetchResults(responseJson);
                    const resultInformation = fetchInfo(responseJson);
                    this.props.loadCharacters(characters, resultInformation, "character");
                });
            });
        } else {
            alert("Please use any one filter. Work in progress to clean this up!");
            e.currentTarget.reset();
        }
    }

    render () {
        return (
        <div className="twelve columns">
            <form ref={this.filterFormRef} className="filterForm" onSubmit={this.handleSearchFilter}>
                <input className="filterInput" name="characterName" ref={ this.characterNameRef } type="text" placeholder="Enter character name" />
                <span className="filterContent">Or</span>
                <input className="filterInput" name="characterId" ref={ this.characterIdRef } type="text" placeholder="Enter character id" />
                <button className="filterSubmit" type="submit">Search</button>
            </form>
        </div>
        )
    }
}

export default CharacterFilter;