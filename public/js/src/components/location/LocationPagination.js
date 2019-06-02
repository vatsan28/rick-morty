import React, { Component } from "react";
import { fetchResults, fetchInfo, buildUrl } from "../../helpers/Api";

var _ = require('lodash');

class LocationPagination extends Component {
    resource = this.props.pageInfo.currentApiResource;
    nextPage = this.props.pageInfo.locations.nextPage;
    prevPage = this.props.pageInfo.locations.prevPage;
    filterName = this.props.pageInfo.locations.filterName;
    type = this.props.pageInfo.locations.type;
    dimension = this.props.pageInfo.locations.dimension;
    currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;

    handleClick = (page) => {
        const url = (this.filterName === "" && this.type === "" && this.dimension === "")
                    ? API_URL+`/${this.resource}/?page=${page}`
                    : buildUrl(API_URL+`/${this.resource}/`, {page, name: filterName, type, dimension})
                    
        fetch(url, {method: 'get'}).then((response)=>{
            response.json().then((responseJson) => {
                const locations = fetchResults(responseJson);
                var resultInformation = fetchInfo(responseJson);
                resultInformation["filterName"] = this.filterName;
                this.props.loadLocations(locations, resultInformation, this.resource);
            })
        });
    }
    
    render() {
        this.resource = this.props.pageInfo.currentApiResource;
        this.nextPage = this.props.pageInfo.locations.nextPage;
        this.prevPage = this.props.pageInfo.locations.prevPage;
        this.filterName = this.props.pageInfo.locations.filterName;
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