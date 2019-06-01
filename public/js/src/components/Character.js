import React, { Component } from 'react';

class Character extends Component {
    render() {
        const { name, status, species, type, gender, origin, location, image } = this.props.characterDetails; 
        const { originName, originUrl } = origin;
        const { locationName, locationUrl } = location;

        return (
            <div className="three columns">
                <div className="card">
                    <img className="characterImage" src={image} alt={name} />
                    <h4 className="limit cName" > { name }</h4>
                    <div>
                        <p>Status: { status }</p>
                        <p>Gender: { gender }</p>
                        <p>
                            Species: { species }
                            { type 
                                ? "Type:" 
                                : ""
                            }
                            Origin: { originName }
                            Location: { locationName }
                        </p>
                    </div>
                </div>

                
            </div>
        );
    }
}

export default Character;