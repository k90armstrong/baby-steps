import React from 'react';
import moment from 'moment';
class Event extends React.Component {
    render() {
        const date = moment(this.props.event.date).format("MMM Do YY");
        return (
            <div className="cd-timeline-block">
                <div className="cd-timeline-image cd-picture">
                    <img src={this.props.event.Images[0] ? this.props.event.Images[0].url : ''} />
                </div>
                <div className="cd-timeline-content">
                    <h2> {this.props.event.title}</h2>
                    <p>{this.props.event.story}</p>
                    <span className="cd-date">{date}</span>
                </div>
            </div>

        )
    }

}
export default  Event;