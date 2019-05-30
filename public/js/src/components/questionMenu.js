import React, { Component } from 'react';
import Question from "./question";

class QuestionMenu extends Component {
    render() {
        const questions = this.props.questions;
        
        return (
            <div>
                <div className = "twelve columns menu">
                    {questions.map((question, i) => <Question key={i} questionText={question} />) }
                </div>
            </div>
        )
    }
}

export default QuestionMenu;