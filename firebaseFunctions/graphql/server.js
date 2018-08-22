import bodyParser from 'body-parser';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './data/schema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import cors from 'cors';

const setupGraphQLServer = () => {
  const graphQLServer = express();

  graphQLServer.use(cors());

  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  );

  graphQLServer.use(
    '/graphiql',
    graphiqlExpress({ endpointURL: '/api/graphql' })
  );

  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });

  return graphQLServer;
};

export default setupGraphQLServer;
