const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const logger = require('morgan');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL_ROOT = 'https://dns.google.com/resolve';

const typeDefs = gql`
  type Record {
    name: String
    type: Int
    TTL: Int
    data: String
  }

  type Query {
    getDNS(lookup: String!, recordTypes: [String!]!): [Record]
  }
`;

const resolvers = {
  Query: {
    getDNS: (root, { lookup, recordTypes }, context, info) => Promise.all(
      recordTypes.map(rr => axios
        .get(`${API_URL_ROOT}?name=${lookup}&type=${rr}`)
        .then(({ data }) => data)
        .catch((e) => {
          console.log(e);
        })),
    )
      .then(data => data.reduce((accum, curr) => {
        if (curr.Answer) {
          curr.Answer.forEach((value) => {
            accum.push(value);
          });
        }
        return accum;
      }, []))
      .catch((e) => {
        console.log(e);
      }),
  },
};

const app = express();

// serve our statics
app.use('/static', express.static(path.join(__dirname, '../../build')));

// setup the logger (incomplete)
app.use(
  logger('combined', {
    stream: fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' }),
  }),
);

// index html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// setup apollo middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log('Server ready at http://localhost:4000'));
