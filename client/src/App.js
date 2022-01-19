import { Route, Routes } from 'react-router-dom';
import Home from './elements/Home';
import Event from './elements/Event';
import EventError from './elements/EventError';
import 'react-calendar/dist/Calendar.css';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events/:id" element={<Event />} />
                <Route path="/eventerror" element={<EventError />} />
            </Routes>
        </div>
    );
}

export default App;
