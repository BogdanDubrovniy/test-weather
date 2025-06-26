# Climate Event Stream Aggregation

The app is divided to back-end and front-end parts. Back part is implemented by Express, Front is implemented by React.

To run the app, use the next sequence:
1. run weather_stream_simulator.js
2. run "npm run start-back" from back with envs: PORT=3000;WS_URL=ws://localhost:8765
3. run "npm run dev-front" from front.

Was done the required flow (back and UI).
Was provided mock data.
Updated weather_stream_simulator.js file (added a case when it's a rate limit issue).
Tested The system with real and mocked data.
Added Cors settings to Back-end (Front can use BAck-end API endpoint).
Added query validation using 'class-validator'.

Next Steps:
1. Storing data (I suggest to store this data in Valkey/Redis, where each key will be a city statistic)
2. If we are talking about Horizontal autoscaling, I would check if any other instance is processing some city, if yes, skip processing.
3. Use an adapter for syncing WS data (I didn't wrk with raw WS, I used only socket.io, which has his own redis-adapter).
4. Add an authorization for socket as well (socket.io can handle it).
5. If we would use socket.io, we need consider using of 'eiows' library for better sockets performance.
6. For data buffering the next stack can be used: BullMQ (a queue based on Redis Streams), Rabbit MQ (use AMQP).
7. Cover the functionality with tests: for back use jest, for front use vitest.
8. Update the timestamp (show the data time using defined timezone).
9. Add custom errors.
10. Add lint and styles checking.
11. Add a documentation for the back-end endpoints (Open API).


## Update:
Refactored Back Part a bit.

### Feature Documentation:
The main idea of this application is gathering temperature statistic by provided cities and draw the graph of the changed temperature during the day hourly.
Key features of the application are:
* Generating the data from https://open-meteo.com/en/docs by provided `[weather_stream_simulator.js](back/src/weather_stream_simulator.js)` plain ws server.
* Listening the WS server by own Express server and store the data in RAM. It has ony one endpoint that exposes the statistic by a city (no authorization but there is inputs validation using 'class-validator' and a validation middleware).
* There is a front-end functionality written on React, it has only 1 page, but you can choose the city statistic on this page.
* On a starting up, the back-end server listens for a WS server, parses the string response in JSON format and store the data (we have a map with key as city(string) and value as injected map (where key is a timestamp of a day and hour)). We use timestamp in format where minutes and seconds are 0, only day and hours are acceptable. If we get a new temperature and it's less than prev min value, we rewrite it (min value), if new temperature is bigger than exist max value, we rewrite it.
* On a graph I demonstrate the min and max temperatures for a specific city, using candlestic diagram, for this purpose I use d3 npm library https://www.npmjs.com/package/d3. This diagram is a draw SVG image using inputs. 

### Development Approach
Since it's a plain application, I considered using Express with Typescript for a Back-end, I used the newest versions that I didn't get any vulnerability issues, I divided the app modules by DDD approach.
For validation inputs I used 'class-validator' npm library because it's pretty popular (4,8 mln downloads) and stable, always updated (the first release was 9 years ago, the last update was 2 months ago). I created query validation middleware that uses the

For Front part I used React and d3 npm library because they work pretty good for graphic demonstrating.

### Types Checking
Added types checking for auth middlewares checking.

### Tests
Added only back-end tests. Jest was used. Covered only temperature service, but covered in 100%.
