FROM ubuntu

ENV NODE_VERSION 0.10.24

# Install common packages
RUN apt-get update
RUN apt-get install -y wget

# Install node
RUN mkdir /opt/node-$NODE_VERSION
RUN wget -O /tmp/node-$NODE_VERSION.tar.gz http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz
RUN tar zxf /tmp/node-$NODE_VERSION.tar.gz --strip-components=1 --no-same-owner -C /opt/node-$NODE_VERSION
RUN ln -s /opt/node-$NODE_VERSION/bin/node /usr/local/bin/node
RUN ln -s /opt/node-$NODE_VERSION/bin/npm /usr/local/bin/npm

ADD . /var/www
RUN cd /var/www && npm install

EXPOSE 3000

CMD [ "node", "/var/www/server.js" ]
