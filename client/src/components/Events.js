import react from 'react';

export default function allEvents(props) {

    const renderEvents = props.data.map(event => {
        return (
            <div>
                <h2>{event.name}</h2>
                <h3>{event.description}</h3>
                <h3>{event.startTime}</h3>
                <h3>{event.endTime}</h3>
            </div>
        )
    })

    return (
        <div>
            <h1>List of Events</h1>
            {renderEvents}
        </div>
    )
}
