import { useState } from 'react';

function App() {

  var listOfEvents = []

  const organizers = [8005515062, 28264037955, 8266180033, 14725464721]

  function consolidateEvents() {
    organizers.forEach(orgID => findEvents(orgID))
    console.log(listOfEvents)
  }

  function eventDatabase() {
    listOfEvents.forEach(event => handleOnSubmit(event))
  }

  const handleOnSubmit = async (eventObject) => {
    let result = await fetch(
      'http://localhost:5000/event/add', {
      method: "post",
      body: JSON.stringify(eventObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    if (result) {
      alert("Data saved successfully");
    }
  }

  function findEvents(organizer) {
    fetch(`https://www.eventbriteapi.com/v3/organizers/${organizer}/events/?start_date.range_start=2022-03-23T00%3A00%3A00Z&token=TDI3RNBKVRWFKWHZ4IO6`)
      .then(response => response.json())
      .then(data => {
        data.events.map((event) => {
          const eventObject = {
            name: event.name.text,
            description: event.summary,
            startTime: event.start.local,
            endTime: event.end.local
          }
          listOfEvents.push(eventObject)
        })
      })
      .catch(err => console.log(err))
  }

  consolidateEvents()

  return (
    <div className="App">
      <button className='btn' onClick={eventDatabase}>hello world</button>
    </div>
  );
}

export default App;
