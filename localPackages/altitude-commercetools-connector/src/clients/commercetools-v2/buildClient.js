import fetch from 'node-fetch';
import {
  ClientBuilder,
} from '@commercetools/sdk-client-v2';
import { auth, host, clientId, clientSecret, projectKey } from './config/config'

const scopes = ['manage_project:' + projectKey];

// Configure authMiddlewareOptions
const authMiddlewareOptions = {
  host: auth,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
  host,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
