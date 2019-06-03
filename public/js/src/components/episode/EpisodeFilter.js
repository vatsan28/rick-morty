import React, { Component } from 'react';
import { makeAPICall } from "../../helpers/Api";

class EpisodeFilter extends Component {
    episodeIdRef = React.createRef();
    episodeNameRef = React.createRef();
    episodeCodeRef = React.createRef();
    episodeFilterFormRef = React.createRef();

    handleEpisodeSearchFilter = e => {
        e.preventDefault();
        const episodeId = this.episodeIdRef.current.value;
        const name = this.episodeNameRef.current.value;
        const code = this.episodeCodeRef.current.value;
        var epiUrl = "/episode/";
        var queryParams;

        if (episodeId === "" && (name != "" || code != "")) {
            queryParams = {page: 1, name, code };
        } else if (name === "" && code === "" && episodeId != "") {
            epiUrl += episodeId;
            queryParams = {page: 1};
        } else {
            alert("Please use just one filter. Work in progress to clean this up!");
            e.currentTarget.reset();
            return;
        }
        
        makeAPICall(epiUrl, queryParams, 'get')
            .then(result => {
                var {resourceResults, resultInformation} = result;
                resultInformation["filterName"] = name;
                resultInformation["code"] = code;

                this.props.loadEpisodes(resourceResults, resultInformation, "episodes");
            })
            .catch(error => {
                const resp = error==404? "no data" : "Error with the API";
                console.log(resp);
                this.props.handleError(error, "episodes");
            });
    }

    reset = e => {
        this.props.handleReset("episodes");
    }

    render () {
        return (
        <div className="twelve columns">
            <form ref={this.episodeFilterFormRef} className="filterForm locFilter" onSubmit={this.handleEpisodeSearchFilter}>
                <input className="filterInput" name="episodeId" ref={ this.episodeIdRef } type="text" placeholder="Enter episode id" />
                <span className="filterContent">Or</span>
                <input className="filterInput" name="episodeCode" ref={ this.episodeCodeRef } type="text" placeholder="Enter episode code(Format example: S01E01)" />
                <input className="filterInput" name="episodeName" ref={ this.episodeNameRef } type="text" placeholder="Enter episode name" />
                
                <button className="filterSubmit" type="submit">Search</button>
                <button className="filterSubmit" onClick={this.reset} type="reset" >Reset</button>
            </form>
        </div>
        )
    }
}

export default EpisodeFilter;