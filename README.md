# React + TypeScript + Vite

# Running Locally

1 - Make sure you have Node.js installed (version 20 or higher).
2 - Install dependencies by running `npm install`
3 - run `npm run dev` to spin up the dev server
4 - go to [localhost:8080](http://localhost:8080/)

# Running with docker

1 - Install docker
2 - cd to project root
3 - `docker build . -t"innoscripta-news:v1.0"`
4 - `docker images`
5 - `docker run -p 8080:8080 innoscripta-news:v1.0`
6 - open [localhost:8080](http://localhost:8080/)
7 - `docker ps` --> to see if its running
