# Amaro Back-End Challenge 👕

A REST API for registering and querying products, built as a technical challenge proposed by
[AMARO](https://github.com/amaroteam/back-end-challenge).

## About

The API stores products and the tags attached to them, and exposes a single search endpoint that
matches on id, name **or** tag. Searching by a tag or a name returns every product matching that
term.

Tags are deduplicated on write: creating a product with a tag that already exists reuses the
existing tag row rather than inserting a duplicate, and the product–tag relationship is stored in
a join table.

## Architecture

The code follows a layered structure, with each layer depending on the one below it through
constructor injection. That is what makes the business layer testable without a database.

```
router      → wires the HTTP routes and injects dependencies
controller  → parses the request, maps errors to status codes
business    → validation and business rules
database    → Knex queries
```

Errors are modelled as classes extending a `BaseError` that carries its own status code, so the
controller maps any known error to the right HTTP response and falls back to 500 for the rest.

## Endpoints

Base path: `/products`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/products` | Register a product with its tags |
| `GET` | `/products` | List every registered product |
| `GET` | `/products/search?key=<term>` | Search by id, name or tag |

**Postman documentation:** https://documenter.getpostman.com/view/21554400/2s8YK4t7pC

### Example request

```http
POST /products
Content-Type: application/json

{
  "id": "0003",
  "name": "Silver Dress",
  "tags": ["ripped", "dirty", "party"]
}
```

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/) with Express
- [Knex](https://knexjs.org/) over MySQL
- [Jest](https://jestjs.io/) for unit tests
- Deployed on [Render](https://render.com/)

## Running it locally

```bash
git clone https://github.com/Brunomon2812/Case-Amaro.git
cd Case-Amaro
npm install
```

Create a `.env` file with the database connection details, then run the migrations and start the
server:

```bash
npm run migrations
npm run dev
```

The API listens on port 3003 by default.

## Tests

The business layer is unit tested with Jest against in-memory mocks of the database, id generator
and hash manager, so no database is needed to run them:

```bash
npm test
```

> **Note:** four of the nine tests currently fail against mock data that has drifted from the
> business rules. They are a known issue and are next on the list to fix.

## Challenge brief

The original specification for this challenge: [amaroteam/back-end-challenge](https://github.com/amaroteam/back-end-challenge)

## Author

Bruno Monteiro — [GitHub](https://github.com/Brunomon2812) · [LinkedIn](https://www.linkedin.com/in/brunoarmonteiro/)
