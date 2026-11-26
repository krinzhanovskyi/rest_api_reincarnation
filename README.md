# A Small Chat with Big Plans

A learning project built with Express and SQLite. It is a working starting point: the API can retrieve and save messages, while the web page is still a simple placeholder. No promises of WebSockets or real-time magic — just the features that are here.

## Getting started

```bash
cd chat
npm install
npm start
```

The server runs at [http://localhost:3000](http://localhost:3000).  
The current page is available at [http://localhost:3000/chat.html](http://localhost:3000/chat.html).

## Messages API

- `GET /api/messages` — retrieve all messages.
- `GET /api/messages/:id` — retrieve a message by ID.
- `POST /api/messages` — create a message. Send JSON:

```json
{
  "name": "Alex",
  "message": "Hello!"
}
```

Both the name and message text are required. Data is stored in the SQLite file `chat/messages.db`; the database is seeded with a few example messages on first launch.

## Tech stack

Node.js · Express · SQLite (`better-sqlite3`)
