import {ConnectClient} from '@vaadin/flow-frontend/Connect';
import {cache} from './cache';

const client = new ConnectClient({prefix: 'connect', middlewares: [cache]});
export default client;