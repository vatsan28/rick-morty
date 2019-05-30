import React from 'react';

class Question extends React.Component {
    render() {
        return (
            <div className="three columns me">
                { this.props.questionText }
            </div>
        )
    }
}
    
export default Question;