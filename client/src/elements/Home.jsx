import Calendar from 'react-calendar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Backend connection parameters
const backendURL = "http://localhost";
const backendPORT = 3001;

function Home() {
    const [inputId, setInputId] = useState("");
    const [id, setId] = useState(0);
    const [value, onChange] = useState(new Date());
    const minDate = new Date();
    const [eventName, setEventName] = useState("");
    const navigate = useNavigate();

    // Retrieve latest event id from database
    useEffect(() => {
        Axios.get(`${backendURL}:${backendPORT}/`)
            .then((response) => {
                if (response.data[0] !== undefined) {
                    setId(response.data[0].id);
                }
            });
    }, [])

    return (
        <div className="mt-5 text-center">
            <div>
                <div>
                    <h1 className="mb-3">Create Event</h1>
                    <p className="mb-3">Choose the possible dates for your event:</p>
                    <Calendar
                        onChange={onChange}
                        minDate={minDate}
                        selectRange // Enable range selection
                        returnValue={"range"} // Alter onChange's return to: value[0] = Start Date, value[1] = End Date
                        className="position-relative start-50 translate-middle-x mb-3"
                    />
                    <div className="container mb-3">
                        <div className="row justify-content-center">
                            <div className="col-xs-12 w300">
                                <div className=" input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Event Name"
                                        value={eventName}
                                        onChange={(event) => {
                                            setEventName(event.target.value);
                                        }}></input>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            Axios.post(`${backendURL}:${backendPORT}/createEvent`, {
                                                eventName: eventName,
                                                minDate: formatISO9075(value[0]),
                                                maxDate: formatISO9075(value[1])
                                            }).then(() => {
                                                const newId = id + 1;
                                                navigate(`/events/${newId}`);
                                            });
                                        }}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="fs-4 my-4">or</p>
            <div>
                <h1 className="mb-3">Access Event</h1>
                <p className="mb-3">Access existing event with its Event ID:</p>
                <div className="container mb-3">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 w300">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Event ID"
                                    value={inputId}
                                    onChange={(event) => {
                                        setInputId(event.target.value);
                                    }}></input>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate(`/events/${inputId}`)
                                    }}>Go</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;
