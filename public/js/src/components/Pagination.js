import React, { Component } from "react";
import { fetchResults, fetchInfo } from "../helpers/Api";

var _ = require('lodash');

class Pagination extends Component {
    resource = this.props.pageInfo.currentApiResource;
    nextPage = this.props.pageInfo.characters.nextPage;
    prevPage = this.props.pageInfo.characters.prevPage;
    currPage = this.props.pageInfo.characters.currPage;
    filterName = this.props.pageInfo.characters.filterName;
    nextClick = true;
    currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;

    addCharactersToState = (characters) => {
        var nextSetOfResidents, prevSetOfResidents, currSetOfResidents;
        if (this.nextClick) {
            nextSetOfResidents = _.slice(this.nextPage,20);
            prevSetOfResidents = _.concat(this.prevPage, this.currPage);
            currSetOfResidents = _.take(this.nextPage, 20);
        } else {
            nextSetOfResidents = _.concat(this.currPage, this.nextPage);
            prevSetOfResidents = _.slice(this.prevPage, 0, this.prevPage.length-20);
            currSetOfResidents = _.takeRight(this.prevPage, 20);
        }
        this.props.addCharacterGroup(characters, nextSetOfResidents, prevSetOfResidents, currSetOfResidents);
    }

    handleClick = (page) => {
        this.props.browseCharacterResults 
            ? this.fetchNextPageCharacters(page) 
            : this.fetchSetOfCharacters(page)
    }
    
    fetchCharacterDetail = (result) => {
        return result.json().then((responseJson) => {
            const character = responseJson;
            console.log("In this awesome place 2");
            return character;
        });
    }

    fetchSetOfCharacters = (residents) => {
        console.log(this.nextClick);
        const nextResidents = this.nextClick ? _.take(residents,20) : _.takeRight(residents, 20);
        const requests = nextResidents.map((url) => {
            return fetch(url, {method: "get"}).then(this.fetchCharacterDetail).catch(this.handleError);
        });
        
        Promise.all(requests)
            .then((res) =>{
                console.log(res);
                this.addCharactersToState(res);
                console.log("Done yaar 2");
            });
    }

    fetchNextPageCharacters = (page) => {
        const url = (this.filterName === "")
                    ? API_URL+`/${this.resource}/?page=${page}`
                    : API_URL+`/${this.resource}/?page=${page}&name=${this.filterName}`
        fetch(url, {method: 'get'}).then((response)=>{
            response.json().then((responseJson) => {
                const characters = fetchResults(responseJson);
                var resultInformation = fetchInfo(responseJson);
                resultInformation["filterName"] = this.filterName;
                this.props.loadCharacters(characters, resultInformation, this.resource);
            })
        });
    }
    
    render() {
        this.resource = this.props.pageInfo.currentApiResource;
        this.nextPage = this.props.pageInfo.characters.nextPage;
        this.prevPage = this.props.pageInfo.characters.prevPage;
        this.filterName = this.props.pageInfo.characters.filterName;
        this.currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;
        this.currPage = this.props.pageInfo.characters.currPage;

        return (
            <div className = "twelve columns">
                {
                    // this.browseCharacterResults 
                    // ? this.renderCharacterBrowsePagination
                    // : this.renderNonCharacterBrowsePagination
                    <div className="pagination">
                    { this.prevPage > 0 || this.prevPage.length > 0
                        ? <i 
                            onClick={()=>{
                                this.nextClick = false;
                                this.handleClick(this.prevPage);
                            }} 
                            className="prev fas fa-5x fa-arrow-alt-circle-left"></i>
                        : null
                    }   
                    { this.props.browseCharacterResults 
                        ? <h3 className="pageInfo">{this.currentPage}/{this.props.pageInfo.characters.totalPages}</h3>
                        : null
                    }
                    { this.nextPage > 0 || this.nextPage.length > 0
                        ? <i 
                            onClick={()=>{
                                this.nextClick = true;
                                this.handleClick(this.nextPage);
                            }}
                             className="next fas fa-5x fa-arrow-alt-circle-right"></i>
                        : null
                    }
                    </div>
                }
                
            </div>
        );
    }
}

export default Pagination;