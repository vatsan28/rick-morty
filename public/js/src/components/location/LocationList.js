import React from "react";
import Location from "./Location";

class LocationList extends React.Component {
    render() {
        const locations = this.props.locations;
        console.log(locations);
        return(
            <div className="scrolling-wrapper-flexbox">
                { 
                    locations && locations.map((l, i) => {
                        return (
                            <Location locationDetails={l} key={i} addCharacterGroup={this.props.addCharacterGroup} />
                        )
                    })
                }
            </div>
        )
    }
}

export default LocationList;