import { useState, useEffect } from 'react';
import axios from 'axios';

import Events from './components/Events';

function App() {

  const [eventsList, addAllEvents] = useState('')

  useEffect(() => {
    getEvents();
  }, [])

  const getEvents = () => {
    axios.get('http://localhost:5000/event/')
      .then((result) => {
        const data = result.data
        addAllEvents(data)
      })
      .catch(() => {
        console.log('Error')
      })
  }

  var listOfEvents = []

  const organizers = [8005515062, 28264037955, 8266180033]
  // const organizers = [8005515062, 28264037955, 8266180033, 14725464721, 8044864594, 18485011612, 32912418431, 33114914047, 17015508596, 16936446005, 11038813553, 7766949713, 36570311693, 34366526431, 36644044233, 8638360184, 18418438842, 12848141810, 26152292493, 34122582695, 10594096171, 27392207565, 37689682823, 43485813703, 25273471509, 32913526131, 38322612533, 18017919697, 21691622859, 37426563793, 13343118562, 34121998635, 15410557031, 40546723083, 7989147284, 12154066053, 42956987653, 40710682823, 8365771326, 42442027993, 14394284575]

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
      console.log("Data saved successfully");
    }
  }

  function findEvents(organizer) {
    fetch(`https://www.eventbriteapi.com/v3/organizers/${organizer}/events/?start_date.range_start=2022-03-23T00%3A00%3A00Z&token=TDI3RNBKVRWFKWHZ4IO6`)
      .then(response => response.json())
      .then(data => {
        data.events.map((event) => {

          const eventObject = {
            name: event.name.text,
            description: event.description.text,
            eventURL: event.url,
            imageURL: event.logo.url,
            startTime: event.start.local,
            endTime: event.end.local
          }
          listOfEvents.push(eventObject)
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button className='btn' onClick={consolidateEvents}>Consolidate events</button>
      <button className='btn' onClick={eventDatabase}>Add to database</button>
      {/* <Events data={eventsList}/> */}
    </div>
  );
}

export default App;
