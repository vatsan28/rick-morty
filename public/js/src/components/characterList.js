import React from "react";
import Character from "./Character";

class CharacterList extends React.Component {
    // componentDidMount = () => {
    //     console.log("We got character!!!",  this.props.characters);
    // }
    getCharacterGroup=(characters)=> {
        var rows = [], size = 3;
        while(characters.length > 0) {
            rows.push(characters.splice(0, size));
        }
        return rows;
    }

    render() {
        const characters = this.getCharacterGroup(this.props.characters);
        
        return(
            <div className="twelve columns cList">
                {
                    characters && characters.map((c,i) => {
                        var key = "cList"+i;
                        return (
                        <div key={key} className="twelve columns">
                            {c[0] && <Character key={c[0]["id"]} characterDetails={c[0]} />}
                            {c[1] && <Character key={c[1]["id"]} characterDetails={c[1]} />}
                            {c[2] && <Character key={c[2]["id"]} characterDetails={c[2]} />  }
                        </div>
                    )})
                }
            </div>
        )
    }
}

export default CharacterList;