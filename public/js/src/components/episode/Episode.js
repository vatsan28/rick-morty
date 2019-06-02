import React, { Component } from 'react';
var _ = require('lodash');

class Episode extends Component {
    addCharactersToState = (characters) => {
        const nextSetOfResidents = _.slice(this.props.episodeDetails.residents, 20);
        const currSetOfResidents = _.slice(this.props.episodeDetails.residents, 0, 20);
        this.props.addCharacterGroup(characters, nextSetOfResidents, [], currSetOfResidents);
    }

    fetchCharacterDetail = (result) => {
        return result.json().then((responseJson) => {
            const character = responseJson;
            console.log("In this awesome place");
            return character;
        });
    }
    handleError=(e)=>{
        console.log(e);
        alert("We have an internal error. Please try again.");
    }
    
    getCharactersFromEpisode = (e, residents) => {
        e.preventDefault();
        
        residents = _.slice(residents,0,20);
        const requests = residents.map((url) => {
            return fetch(url, {method: "get"}).then(this.fetchCharacterDetail).catch(this.handleError);
        });
        
        Promise.all(requests)
            .then((res) =>{
                console.log(res);
                this.addCharactersToState(res);
                console.log("Done yaar");
            });
    }
    render() {
        const { id, name, air_date, episode, characters, url, created } = this.props.episodeDetails; 
        
        return (
            <div onClick={(e)=>this.getCharactersFromEpisode(e, characters)} className="locCard" id={id}>
                <h4 className="locLimit" > { name }</h4>
                <div className="characterInfo">
                    <p> 
                        <span>EPISODE:</span> <span> {episode} </span> <br />
                        <span>AIRED AT:</span> <span>{air_date}</span>
                        <br />
                        <span>CREATED AT:</span> <span>{created.substr(0,10)}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default Episode;