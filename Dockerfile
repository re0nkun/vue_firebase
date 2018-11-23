FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install -g vue-cli
# RUN yarn global add @vue/cli

RUN npm install -g firebase-tools
# firebase login:ci --no-localhost
# firebase init --token "$FIREBASE_TOKEN"
# npm run build
# firebase deploy --token "$FIREBASE_TOKEN"

ENV HOST 0.0.0.0

# EXPOSE 3000
# EXPOSE 8080