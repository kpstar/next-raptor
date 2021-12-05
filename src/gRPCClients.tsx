import { NgoAuthClient } from './ngoauth/TestauthServiceClientPb';
import { NgoAPIClient } from './ngoauth/TestapiServiceClientPb';

const baseUrl = "https://orderstest.raptorpos.com:8007";

export type GRPCClients = {
  ngoAuthClient: NgoAuthClient;
  ngoAPIClient: NgoAPIClient;
};

export const gRPCClients = {
  ngoAuthClient: new NgoAuthClient(baseUrl),
  ngoAPIClient: new NgoAPIClient(baseUrl)
};
