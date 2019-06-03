import React, { Component } from 'react';
import { makeAPICall } from "../../helpers/Api";

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
        var locUrl = "/location/";
        var queryParams = {};

        if (locationId === "" && (locationName != "" || locationType != "" || locationDimension != "")) {
            queryParams = {page: 1, name: locationName,dimension: locationDimension, type: locationType };
        } else if (locationId != "" && (locationName == "" && locationType == "" && locationDimension == "")) {
            locUrl += locationId;
            queryParams = {page: 1};
        } else {
            alert("Please use one of the filters. Work in progress!!!");
            e.currentTarget.reset();
        }
        
        makeAPICall(locUrl, queryParams, 'get')
            .then(result => {
                var {resourceResults, resultInformation} = result;
                resultInformation["filterName"] = locationName;
                resultInformation["filterType"] = locationType;
                resultInformation["filterDimension"] = locationDimension;
                this.props.loadLocations(resourceResults, resultInformation, "locations");
            })
            .catch(error => {
                console.log(error);
                const resp = error==404? "no data" : "Error with the API";
                console.log(resp);
                this.props.handleError(error, "locations");
            });
    }
    
    reset = e => {
        this.props.handleReset("locations");
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
                <button className="filterSubmit" onClick={this.reset} type="reset" >Reset</button>
            </form>
        </div>
        )
    }
}

export default LocationFilter;