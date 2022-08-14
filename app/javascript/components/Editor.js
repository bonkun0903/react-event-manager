// app/javascript/components/Editor.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EventList from './EventList';
import Event from './Event';
import EventForm from './EventForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helper';

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/v1/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        handleAjaxError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const response = await window.fetch('/api/v1/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statesText);

      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      // window.alert('Event Added!');
      success('Event Added!');
      navigate(`/events/${savedEvent.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteEvent = async (eventId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/v1/events/${eventId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statesText);

        // window.alert('Event Deleted!');
        success('Event Deleted!');
        navigate('/events/');
        setEvents(events.filter((event) => event.id !== eventId));
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await window.fetch(
        `/api/v1/events/${updatedEvent.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedEvent),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw Error(response.statusText);

      const newEvents = events;
      const idx = newEvents.findIndex((event) => event.id === updatedEvent.id);
      newEvents[idx] = updatedEvent;
      setEvents(newEvents);

      success('Event updated!');
      navigate(`/events/${updatedEvent.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <EventList events={events} />
            <Routes>
              <Route
                path=":id"
                element={<Event events={events} onDelete={deleteEvent} />}
              />
              <Route
                path=":id/edit"
                element={<EventForm events={events} onSave={updateEvent} />}
              />
              <Route
                path="new"
                element={<EventForm onSave={addEvent} />}
              />
            </Routes>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Editor;
