import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import EventNotFound from './EventNotFound';

const Event = ({ events, onDelete }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) return <EventNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {event.event_date}
        -
        {event.event_type}
        <Link to={`/events/${event.id}/edit`}>Edit</Link>
        <button
          type="button"
          className="delete"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Type:</strong>
          {event.event_type}
        </li>
        <li>
          <strong>Date:</strong>
          {event.event_date}
        </li>
        <li>
          <strong>Title:</strong>
          {event.title}
        </li>
        <li>
          <strong>Speaker:</strong>
          {event.speaker}
        </li>
        <li>
          <strong>Host:</strong>
          {event.host}
        </li>
        <li>
          <strong>Published:</strong>
          {event.published ? 'yes' : 'no'}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      event_type: PropTypes.string,
      event_date: PropTypes.string,
      title: PropTypes.string,
      speaker: PropTypes.string,
      host: PropTypes.string,
      published: PropTypes.bool,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Event;
