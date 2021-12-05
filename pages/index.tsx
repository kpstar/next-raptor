import type { NextPage } from 'next';

import EventContainer from '../src/containers/EventBoard';
import { gRPCClients } from '../src/gRPCClients';

export const App: NextPage = () => (
  <>
    <EventContainer clients={gRPCClients} />
  </>
);

export default App;
