# exportdefault.shop

> A modern, fully-featured eCommerce platform built with MERN.

## Getting Started

This project brings together everything you need for a fully-featured, fully custom, eCommerce site: product exploration and searching, product pages, carousels, and pagination, as well as authenticated sign-on and user accounts stored in a managed database, an admin dashboards to manage users/customers, products, and order details. The exportdefault.shop platform also has a product rating and review system, shopping carts, an integrated ordering system that handles marking orders as shipped/delivered, as well as the entire checkout process including shipping selection, payment options (credit/debit card processing, Paypal integration), and finally a custom database seeder script.

The technologies included in this project include (but not limited to):

- **React** (with functional components and hooks)
- **React router**
- **React-Bootstrap**
- State management via **Redux** (`actions`, `reducers`)
- **Redux**-mananaged componenents (`useDispatch`, `useSelector`)
- **Express** back-end server
  - **Express Async Handler**
- Live **MongoDB** integration, and **Mongoose ODM**
- **JWT** authentication
- Fully custom authentication middleware
- Fully custom error handlers
- **Paypal** API integration
- Project deployment pipeline, via **Heroku**

### Prerequisites

- TBD

### Installing

1. Clone the repo
2. Navigate to `./frontend` and install packages via `$ npm i`
3. ...

## API

`exportdefault.shop` has a RESTful API architecture. The frontend and backend communicate via HTTP methods and JSON data, while the backend communicates with the MongoDB database via Mongoose.

- `GET`: `/api/products`
- `POST`: `/api/products`
- `PUT`: `/api/products/99`
- `DELETE`: `/api/products/99`

## Running the tests

- TBD

### Break down into end to end tests

- TBD

### And coding style tests

- TBD

## Deployment

- TBD

## Built With

- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [Node](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Heroku](https://www.heroku.com/)
- [JWT: JSON Web Tokens](https://jwt.io/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootswatch](https://bootswatch.com/)

## Contributing

- Please read [CONTRIBUTING.md (LINK MISSING)](#) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

- This project uses semantic versioning. Please see [SemVer](https://semver.org/) for more information on the SemVer spec.

## Authors

- **Connor Dillon** - _Developer_ - [connoro7](https://github.com/connoro7)
- See also the list of [contributors](https://github.com/connoro7/exportdefault.shop/contributors) who participated in this project.

## License

- This project is licensed under the MIT License.

## Acknowledgments
