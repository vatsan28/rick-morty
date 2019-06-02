import React, { Component } from "react";
import { fetchResults, fetchInfo, buildUrl } from "../../helpers/Api";

var _ = require('lodash');

class EpisodePagination extends Component {
    resource = this.props.pageInfo.currentApiResource;
    nextPage = this.props.pageInfo.episodes.nextPage;
    prevPage = this.props.pageInfo.episodes.prevPage;
    filterName = this.props.pageInfo.episodes.filterName;
    code = this.props.pageInfo.episodes.code;
    currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;

    handleClick = (page) => {
        const url = (this.filterName === "" && this.code === "")
                    ? API_URL+`/${this.resource}/?page=${page}`
                    : buildUrl(API_URL+`/${this.resource}/`, {page, name: this.filterName, code: this.code})
        fetch(url, {method: 'get'}).then((response)=>{
            response.json().then((responseJson) => {
                const episodes = fetchResults(responseJson);
                var resultInformation = fetchInfo(responseJson);
                resultInformation["filterName"] = this.filterName;
                resultInformation["code"] = this.code;
                this.props.loadEpisodes(episodes, resultInformation, this.resource);
            })
        });
    }
    
    render() {
        this.resource = this.props.pageInfo.currentApiResource;
        this.nextPage = this.props.pageInfo.episodes.nextPage;
        this.prevPage = this.props.pageInfo.episodes.prevPage;
        this.filterName = this.props.pageInfo.episodes.filterName;
        this.code = this.props.pageInfo.episodes.code;
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
                        <h3 className="pageInfo">{this.currentPage}/{this.props.pageInfo.episodes.totalPages}</h3>
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

export default EpisodePagination;