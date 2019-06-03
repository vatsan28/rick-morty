import React, { Component } from "react";
import { makeAPICall } from "../../helpers/Api";

var _ = require('lodash');

class LocationPagination extends Component {
    resource = this.props.pageInfo.currentApiResource;
    nextPage = this.props.pageInfo.locations.nextPage;
    prevPage = this.props.pageInfo.locations.prevPage;
    filterName = this.props.pageInfo.locations.filterName;
    filterType = this.props.pageInfo.locations.type;
    filterDimension = this.props.pageInfo.locations.dimension;
    currentPage = this.prevPage + 1;
    
    handleClick = (page) => {
        var url = `/location/`;
        var queryParams = {};
        const name = this.props.pageInfo.locations.filterName;
        const type = this.props.pageInfo.locations.filterType;
        const dimension = this.props.pageInfo.locations.filterDimension;
        
        queryParams = { page, name, type, dimension};
        
        makeAPICall(url, queryParams, 'get')
        .then(result => {
            var {resourceResults, resultInformation} = result;
            resultInformation["filterName"] = name; 
            resultInformation["filterType"] = type;
            resultInformation["filterDimension"] = dimension;
            
            this.props.loadLocations(resourceResults, resultInformation, this.resource);
        })
        .catch(error => {
            this.props.handleError(error, this.resource);
        });
    }
    
    render() {
        this.resource = this.props.pageInfo.currentApiResource;
        this.nextPage = this.props.pageInfo.locations.nextPage;
        this.prevPage = this.props.pageInfo.locations.prevPage;
        this.filterName = this.props.pageInfo.locations.filterName;
        this.type = this.props.pageInfo.locations.type;
        this.dimension = this.props.pageInfo.locations.dimension;
        this.currentPage = this.prevPage + 1;

        return (
            <div className = "twelve columns">
                {
                    <div className="pagination">
                    { this.prevPage > 0
                        ? <i 
                            onClick={()=>{this.handleClick(this.prevPage)}} 
                            className="prev fas fa-5x fa-arrow-alt-circle-left"></i>
                        : null
                    }   
                        <h3 className="pageInfo">{this.currentPage}/{this.props.pageInfo.locations.totalPages}</h3>
                    { this.nextPage > 0
                        ? <i 
                            onClick={()=>{this.handleClick(this.nextPage)}}
                             className="next fas fa-5x fa-arrow-alt-circle-right"></i>
                        : null
                    }
                    </div>
                }
                
            </div>
        );
    }
}

export default LocationPagination;