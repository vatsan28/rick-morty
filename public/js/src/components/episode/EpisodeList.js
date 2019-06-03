import React from "react";
import Episode from "./Episode";

class EpisodeList extends React.Component {
    render() {
        const episodes = this.props.episodes;
        
        return(
            <div className="scrolling-wrapper-flexbox">
                { 
                    episodes && episodes.map((l, i) => {
                        return (
                            <Episode episodeDetails={l} key={i} addCharacterGroup={this.props.addCharacterGroup} />
                        )
                    })
                }
            </div>
        )
    }
}

export default EpisodeList;