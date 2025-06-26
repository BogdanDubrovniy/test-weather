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
