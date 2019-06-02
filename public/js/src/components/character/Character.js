import React, { Component } from 'react';

class Character extends Component {
    render() {
        const { name, status, species, type, gender, origin, location, image } = this.props.characterDetails; 
        
        return (
            <div className="three columns">
                <div className="card">
                    <img className="characterImage" src={image} alt={name} />
                    <h4 className="limit cName" > { name }</h4>
                    <div className="characterInfo">
                        <div>
                            <span>STATUS:</span> <span>{ status }</span>
                        </div>
                        <div>
                            <span>GENDER:</span>  <span>{ gender }</span>
                        </div>
                        <div>
                            <span>SPECIES:</span> <span>{ species }</span>
                        </div>
                        <div>
                            { type != ""
                                ? "Type:" 
                                : ""
                            }
                        </div>
                        <div>
                            <span>ORIGIN:</span> <span>{ origin["name"] }</span>
                        </div>
                        <div>
                            <span>LOCATION:</span> <span>{location["name"]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Character;