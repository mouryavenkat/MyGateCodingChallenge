FROM node:9.0-alpine

# Create  directories
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# COPY dependencies
COPY package.json /usr/src/app/

# INSTALL dependencies
RUN npm install
# Bundle app source
COPY . /usr/src/app
EXPOSE 3000
EXPOSE 8080
CMD ["npm","start", ";","node","/usr/src/app/src/server/server.js"]
