import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import PropTypes from 'prop-types';
import { isEmptyObject, validateEvent, formatDate } from '../helpers/helper';
import EventNotFound from './EventNotFound';

const EventForm = ({ events, onSave }) => {
  const { id } = useParams();

  // メモ化されたコールバックを返す
  const initialEventState = useCallback(
    () => {
      const defaults = {
        event_type: '',
        event_date: '',
        title: '',
        speaker: '',
        host: '',
        published: false,
      };

      const currEvent = id ? events.find((e) => e.id === Number(id)) : {};

      return { ...defaults, ...currEvent };
    },
    [events, id],
  );

  const [event, setEvent] = useState(initialEventState);
  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setEvent((preEvent) => ({ ...preEvent, [key]: value }));
  };

  useEffect(() => {
    // レンダリング時に毎回初期イベントステートにセットします。
    setEvent(initialEventState);
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date) => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });
    return () => p.destroy();
  }, [events, initialEventState]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    updateEvent(name, value);
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(event);
    }
  };

  const cancelURL = event.id ? `/events/${event.id}` : '/events';
  const title = event.id ? `${event.event_date} - ${event.event_type}` : 'New Event';

  if (id && !event.id) return <EventNotFound />;

  return (
    <section>
      <h2>{title}</h2>
      {renderErrors()}

      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input
              type="text"
              id="event_type"
              name="event_type"
              onChange={handleInputChange}
              value={event.event_type}
            />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
              ref={dateInput}
              autoComplete="off"
              value={event.event_date}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
              value={event.title}
            />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input
              type="text"
              id="speaker"
              name="speaker"
              onChange={handleInputChange}
              value={event.speaker}
            />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input
              type="text"
              id="host"
              name="host"
              onChange={handleInputChange}
              value={event.host}
            />
          </label>
        </div>
        <div>
          <label htmlFor="publised">
            <strong>Publish:</strong>
            <input
              type="checkbox"
              id="publised"
              name="publised"
              onChange={handleInputChange}
              value={event.published}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </section>
  );
};

export default EventForm;

EventForm.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_type: PropTypes.string.isRequired,
      event_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
    }),
  ),
  onSave: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
  events: [],
};
