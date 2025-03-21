# Digi - Cadence backend repo (Nodejs):

## Setup

1. Install dependencies

```bash
npm install
```


2.  Set up environment variables:

*   Create a `.env` file in the root directory.
*   Add the necessary environment variables (copy from `.env.example`).

3.  Run the application:

```bash
npm start
```


## Development using docker

To build the docker image:

```bash
docker build -t tag_name .
```

To run the docker container from the image:

```bash
docker run -e PORT=3000 -e DB_HOST=host.docker.internal tag_name
```
