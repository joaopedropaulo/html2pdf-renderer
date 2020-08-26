FROM node:14.8.0

# Create app directory
WORKDIR /home/node

# Copy 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server app code
COPY ./src ./src

EXPOSE 5000

CMD ["npm", "run", "start"]