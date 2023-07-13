FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve
#Expose the app's port
EXPOSE 3000

#CMD [ "npm", "start" ]
CMD serve -s build