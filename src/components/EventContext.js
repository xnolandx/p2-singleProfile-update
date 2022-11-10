import React from 'react';

const EventContext = React.createContext({EventData: {}, setEventData: () => {}});

export default EventContext;