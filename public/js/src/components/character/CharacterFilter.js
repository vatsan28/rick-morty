import React, { Component } from 'react';
import { makeAPICall } from "../../helpers/Api";

class CharacterFilter extends Component {
    characterNameRef = React.createRef();
    characterIdRef = React.createRef();
    filterFormRef = React.createRef();

    handleSearchFilter = e => {
        e.preventDefault();
        const characterName = this.characterNameRef.current.value;
        const characterId = this.characterIdRef.current.value;
        var url = "/character/";
        var queryParams = {};
        
        if (characterId === "" && characterName != "") {
            queryParams = {page: 1, name: characterName};
        } else if (characterName === "" && characterId != "") {
            url += characterId
            queryParams = {page: 1};
        } else {
            alert("Please use any one filter. Work in progress to give you more power!");
            e.currentTarget.reset();
            return;
        }
        
        makeAPICall(url, queryParams, 'get')
            .then(result => {
                var {resourceResults, resultInformation} = result;
                resultInformation["filterName"] = characterName;
                this.props.loadCharacters(resourceResults, resultInformation, "characters");
            })
            .catch(error => {
                this.props.handleError(error, "characters");
            });
    }

    reset = e => {
        this.props.handleReset("characters");
    }

    render () {
        return (
        <div className="twelve columns">
            <form ref={this.filterFormRef} className="filterForm" onSubmit={this.handleSearchFilter}>
                <input 
                    className="filterInput" 
                    name="characterName" 
                    ref={ this.characterNameRef } 
                    type="text" 
                    placeholder="Enter character name" 
                />
                <span className="filterContent">Or</span>
                <input 
                    className="filterInput" 
                    name="characterId" 
                    ref={ this.characterIdRef } 
                    type="text" 
                    placeholder="Enter character id" 
                />
                <button className="filterSubmit" type="submit">Search</button>
                <button className="filterSubmit" onClick={this.reset} type="reset" >Reset</button>
            </form>
        </div>
        )
    }
}

export default CharacterFilter;