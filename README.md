# Climate Event Stream Aggregation

The app is divided to back-end and front-end parts. Back part is implemented by Express, Front is implemented by React.

To run the app, use the next sequence:
1. run weather_stream_simulator.js
2. "npm run start-socket-server" from /back with envs
3. run "npm run start-back" from /back with envs
4. run "npm run dev-front" from /front.

Added Cors settings to Back-end (Front can use Back-end API endpoint).
Added query validation using 'class-validator'.
Stored data in DB (Postgres), transering data between services is by Redis Streams.
Added eslint, to run, call "npm run lint" from /back.
Added pino as a logger library.

To do:
1. Add a documentation for the back-end endpoints (Open API).
2. Implemented authN/authZ.

### Feature Documentation:
The main idea of this application is gathering temperature statistic by provided cities and draw the graph of the changed temperature during the day hourly.
Key features of the application are:
* Generating the data from https://open-meteo.com/en/docs by provided `[weather_stream_simulator.js](back/src/weather_stream_simulator.js)` plain ws server.
* Listening the WS server by own Express server and store the data in RAM. It has ony one endpoint that exposes the statistic by a city (no authorization but there is inputs validation using 'class-validator' and a validation middleware).
* There is a front-end functionality written on React, it has only 1 page, but you can choose the city statistic on this page.
* On a starting up, the back-end server listens for a WS server, parses the string response in JSON format and store the data (we have a map with key as city(string) and value as injected map (where key is a timestamp of a day and hour)). We use timestamp in format where minutes and seconds are 0, only day and hours are acceptable. If we get a new temperature and it's less than prev min value, we rewrite it (min value), if new temperature is bigger than exist max value, we rewrite it.
* On a graph I demonstrate the min and max temperatures for a specific city, using candlestic diagram, for this purpose I use d3 npm library https://www.npmjs.com/package/d3. This diagram is a draw SVG image using inputs.
