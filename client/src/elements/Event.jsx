import Calendar from 'react-calendar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { isWithinInterval, subDays, formatISO9075 } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';

// Backend connection parameters
const backendURL = "http://localhost";
const backendPORT = 3001;

function Event() {
    const eventId = useParams().id;
    const [eventName, setEventName] = useState("");
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [disabledDates, setDisabledDates] = useState([])
    const navigate = useNavigate();

    const tileDisabled = ({ date }) => {
        return isWithinRanges(date, disabledDates);
    }

    // Retrieve data from database and set initial states
    useEffect(() => {
        Axios.get(`${backendURL}:${backendPORT}/events/${eventId}`)
            .then((response) => {
                if (response.data[0] !== undefined) {
                    setMinDate(new Date(response.data[0].minDate));
                    setMaxDate(new Date(response.data[0].maxDate));
                    setEventName(response.data[0].eventName);
                } else {
                    navigate("/eventerror");
                }
            });
        Axios.post(`${backendURL}:${backendPORT}/events/${eventId}/disableddates`)
            .then((response) => {
                const data = response.data;
                let newDisabledDates = [];
                for (let i = 0; i < data.length; i++) {
                    newDisabledDates = [
                        ...newDisabledDates,
                        [subDays(new Date(data[i].startDate), 1), new Date(data[i].endDate)]
                    ];
                };
                setDisabledDates(newDisabledDates);
            });
    }, [])

    return (
        <div className="mt-5 text-center">
            <h1 className="mb-3">{eventName}</h1>
            <h6 className="mb-3">Event ID: {eventId}</h6>
            <Calendar
                value={null}
                onChange={null}
                activeStartDate={minDate}
                minDate={minDate}
                maxDate={maxDate}
                tileDisabled={tileDisabled}
                className="position-relative start-50 translate-middle-x mb-3"
            />
            <AddBusy
                eventId={eventId}
                disabledDates={disabledDates}
                setDisabledDates={setDisabledDates}
            />
        </div>
    );
}

function isWithinRange(date, range) {
    return isWithinInterval(date, { start: range[0], end: range[1] });
}

function isWithinRanges(date, ranges) {
    return ranges.some(range => isWithinRange(date, range));
}

function AddBusy(props) {

    const eventId = props.eventId;
    const disabledDates = props.disabledDates;
    const [inputStart, setInputStart] = useState(new Date(0));
    const [inputEnd, setInputEnd] = useState(new Date(0));

    const updateDisabledDates = (newDisabledDates) => {
        Axios.post(`${backendURL}:${backendPORT}/events/${eventId}`, {
            id: eventId,
            startDate: formatISO9075(new Date(inputStart)),
            endDate: formatISO9075(new Date(inputEnd))
        });
        props.setDisabledDates(newDisabledDates);
    }

    return (
        <div>
            <p className="fs-5 mt-4 mb-3">Mark unavailable dates:</p>
            <div className="container mb-3">
                <div className="row justify-content-center">
                    <div className="col-xs-12 w500">
                        <div className="input-group">
                            <span className="input-group-text">Start:</span>
                            <input
                                className="form-control"
                                autoComplete="off"
                                type="date"
                                value={inputStart}
                                onChange={(event) => {
                                    setInputStart(event.target.value);
                                }}
                            />
                            <span className="input-group-text">End:</span>
                            <input
                                className="form-control"
                                autoComplete="off"
                                type="date"
                                value={inputEnd}
                                onChange={(event) => {
                                    setInputEnd(event.target.value);
                                }}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={() => updateDisabledDates(
                                    packageNewDisabledDates(
                                        disabledDates, inputStart, inputEnd
                                    ))}>Mark</button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="fst-italic">For discontinuous date ranges, mark them through separate attemps.</p>
        </div >
    );
}

function packageNewDisabledDates(disabledDates, inputStart, inputEnd) {
    const newDisabledDates = [
        ...disabledDates,
        [subDays(new Date(inputStart), 1), new Date(inputEnd)]
    ];
    return (newDisabledDates);
}

export default Event;
