import React, { Component } from 'react';
var _ = require('lodash');

class Location extends Component {
    addCharactersToState = (characters) => {
        const nextSetOfResidents = _.slice(this.props.locationDetails.residents, 20);
        const currSetOfResidents = _.slice(this.props.locationDetails.residents, 0, 20);
        this.props.addCharacterGroup(characters, nextSetOfResidents, [], currSetOfResidents);
    }

    fetchCharacterDetail = (result) => {
        return result.json().then((responseJson) => {
            return responseJson;
        });
    }
    handleError=(e)=>{
        alert("We have an internal error. Please try again.");
    }
    
    getCharactersFromLocation = (e, residents) => {
        e.preventDefault();
        
        residents = _.slice(residents,0,20);
        const requests = residents.map((url) => {
            return fetch(url, {method: "get"}).then(this.fetchCharacterDetail).catch(this.handleError);
        });
        
        Promise.all(requests)
            .then((res) =>{
                this.addCharactersToState(res);
            });
    }
    render() {
        const { id, name, type, dimension, residents, url, created } = this.props.locationDetails; 
        
        return (
            <div onClick={(e)=>this.getCharactersFromLocation(e, residents)} className="locCard" id={id}>
                <h4 className="locLimit" > { name }</h4>
                <div className="characterInfo">
                    <p> 
                        <span>TYPE:</span> <span> {type} </span> <br />
                        <span>DIMENSION:</span> <span> {dimension} </span>  
                        <br />
                        <span>CREATED AT:</span> <span>{created.substr(0,10)}</span>
                        <br />
                        <span>No.Of Characters</span> <span>{residents.length}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default Location;