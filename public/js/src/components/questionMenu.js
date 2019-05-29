import React, { Component } from 'react';
import Question from "./question";

class QuestionMenu extends Component {
    render() {
        return (
            <div>
                <div className = "twelve columns">
                    <div className="three columns">
                        <Question questionText="1" />
                        <Question questionText="2" />
                        <Question questionText="3" />
                        <Question questionText="4" />
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionMenu;