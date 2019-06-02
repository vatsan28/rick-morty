import React, { Component } from 'react';
import { fetchResults, fetchInfo, buildUrl } from "../../helpers/Api";

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
        var epiUrl, url;

        if (episodeId === "" && (name != "" || code != "")) {
            epiUrl = API_URL+"/episode/";
            url = buildUrl(epiUrl, {page: 1, name, code });
        } else if (name === "" && code === "" && episodeId != "") {
            epiUrl = API_URL+"/episode/"+episodeId;
            url = buildUrl(epiUrl, {page: 1});
        } else {
            alert("Please use just one filter. Work in progress to clean this up!");
            e.currentTarget.reset();
            return;
        }
        
        fetch(url,{method: 'get'}).then((response) => {
            response.json().then((responseJson) => {
                const episodes = fetchResults(responseJson);
                var resultInformation = fetchInfo(responseJson);
                resultInformation["filterName"] = name;
                resultInformation["code"] = code;
                
                this.props.loadEpisodes(episodes, resultInformation, "episode");
            });
        });
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
            </form>
        </div>
        )
    }
}

export default EpisodeFilter;