import React from "react";
import Character from "./Character";

class CharacterList extends React.Component {
    componentDidMount = () => {
        console.log("We got character!!!",  this.props.characters);
    }
    
    render() {
        const characters = this.props.characters;
        return(
            <div className="twelve columns cList">
                {
                    /*
                    We shall map the characters here with the character component.
                    */
                    characters.map((c, i) => <Character key={c["id"]} characterDetails={c} />)
                }
            </div>
        )
    }
}

export default CharacterList;