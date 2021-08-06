FROM node:buster

WORKDIR /usr/src/facerecognition-api

COPY ./ ./

RUN npm install 

CMD ["/bin/bash"]