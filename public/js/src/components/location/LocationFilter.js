import React, { Component } from 'react';
import { fetchResults, fetchInfo, buildUrl } from "../../helpers/Api";

class LocationFilter extends Component {
    locationNameRef = React.createRef();
    locationIdRef = React.createRef();
    locationTypeRef = React.createRef();
    locationDimensionRef = React.createRef();
    locationFilterFormRef = React.createRef();

    handleLocationSearchFilter = e => {
        e.preventDefault();
        const locationName = this.locationNameRef.current.value;
        const locationId = this.locationIdRef.current.value;
        const locationType = this.locationTypeRef.current.value;
        const locationDimension = this.locationDimensionRef.current.value;
        var locUrl, url;

        if (locationId === "" && (locationName != "" || locationType != "" || locationDimension != "")) {
            locUrl = API_URL+"/location/";
            url = buildUrl(locUrl, {page: 1, name: locationName,dimension: locationDimension, type: locationType });
        } else if (locationId != "" && (locationName == "" && locationType == "" && locationDimension == "")) {
            locUrl = API_URL+"/location/"+locationId;
            url = buildUrl(url, {page: 1});
        } else {
            alert("Please use atleast one filter. Work in progress!!!");
            e.currentTarget.reset();
        }
        
        fetch(url,{method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const locations = fetchResults(responseJson);
                var resultInformation = fetchInfo(responseJson);
                resultInformation["filterName"] = locationName;
                resultInformation["filterType"] = locationType;
                resultInformation["filterDimension"] = locationDimension;
                this.props.loadLocations(locations, resultInformation, "location");
            });
        });
    }

    render () {
        return (
        <div className="twelve columns">
            <form ref={this.locationFilterFormRef} className="filterForm locFilter" onSubmit={this.handleLocationSearchFilter}>
                <input className="filterInput" name="locationId" ref={ this.locationIdRef } type="text" placeholder="Enter location id" />
                <span className="filterContent">Or</span>
                <input className="filterInput" name="locationName" ref={ this.locationNameRef } type="text" placeholder="Enter location name" />
                <input className="filterInput" name="locationType" ref={ this.locationTypeRef } type="text" placeholder="Enter location type" />
                <input className="filterInput" name="locationDimension" ref={ this.locationDimensionRef } type="text" placeholder="Enter location dimension" />

                <button className="filterSubmit" type="submit">Search</button>
            </form>
        </div>
        )
    }
}

export default LocationFilter;