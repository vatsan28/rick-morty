import React, { Component } from "react";
import { fetchResults, fetchInfo } from "../helpers/Api";

class Pagination extends Component {
    resource = this.props.pageInfo.currentApiResource;
    nextPage = this.props.pageInfo.nextPage;
    prevPage = this.props.pageInfo.prevPage;
    currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;

    handleClick = (page) => {
        const url = API_URL+`/${this.resource}/?page=${page}`;
        fetch(url, {method: 'get'}).then((response)=>{
            response.json().then((responseJson) => {
                
                const characters = fetchResults(responseJson);
                const resultInformation = fetchInfo(responseJson);
                
                this.props.loadCharacters(characters, resultInformation, this.resource);
            })
        });
    }
    
    render() {
        this.resource = this.props.pageInfo.currentApiResource;
        this.nextPage = this.props.pageInfo.nextPage;
        this.prevPage = this.props.pageInfo.prevPage;
        this.currentPage = this.nextPage == "" ? 1 :  this.nextPage - 1;
        
        return (
            <div className = "twelve columns">
                <div className="pagination">
                { this.prevPage > 0
                    
                    ? <i onClick={()=>this.handleClick(this.prevPage)} className="prev fas fa-5x fa-arrow-alt-circle-left"></i>
                    : null
                }
                    <h3 className="pageInfo">{this.currentPage}/{this.props.pageInfo.totalPages}</h3>
                { this.nextPage > 0
                    ? <i onClick={()=>this.handleClick(this.nextPage)} className="next fas fa-5x fa-arrow-alt-circle-right"></i>
                    : null
                }
                </div>
            </div>
        );
    }
}

export default Pagination;