## Installation

```
VITE_DB
VITE_SECRET
VITE_EXPIRE
VITE_POLLING
```

- Add these values in `.env` file.
- Add full mongodb url with user credentials
- In terminal run `npm install`
- After completing installation run `npm run dev`

## Routes

- All routes added authorization validation except `login` & `signup`

### User

- `http://localhost:5000/api/v1/users` for creating user with `POST`
- `http://localhost:5000/api/v1/users/` for getting all users with `GET`
- `http://localhost:5000/api/v1/users/login` Login user with `POST`

### Product

- `http://localhost:5000/api/v1/products` for creating product with `POST`
- `http://localhost:5000/api/v1/products` for getting all products with `GET`
- `http://localhost:5000/api/v1/products/:id` for getting single product with `GET`
- `http://localhost:5000/api/v1/products/:id` for updating single product with `PUT`
- `http://localhost:5000/api/v1/products/:id` for Deleting single product with `DELETE`

### Product

- `http://localhost:5000/api/v1/sell` for creating sell with `POST`
- `http://localhost:5000/api/v1/sell` for getting all sales with `GET`
- `http://localhost:5000/api/v1/sell/data` for getting all sales data for chart with `GET`
