import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute, createHandlerBoundToURL} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';
import {CacheableEndpoint} from './CacheableEndpoint';

skipWaiting();
clientsClaim();

// @ts-ignore (__WB_MANIFEST is injected by the InjectManifest plugin)
precacheAndRoute(self.__WB_MANIFEST);

// This assumes /index.html has been precached.
const handler = createHandlerBoundToURL('/index.html');

// Custom response processing to rewrite the base URL.
// That's required in order to use the app shell cached for the `/` URL
// when responding to URLs like `/non/root/path`.
// TODO: do not assume the app is deployed to `/`
const myHandler = async ({url}) => {
  const baseUrlParts = new Array(url.pathname.match(/\//g).length).fill('..');
  baseUrlParts[0] = '.';
  const baseUrl = baseUrlParts.join('/')
  const response = await handler();
  const html = await response.text();
  const newHtml = html.replace(/<base\s+href=([^>]+)>/, `<base href="${baseUrl}">`);
  console.log(`base URL rewritten to ${baseUrl}`);
  return new Response(newHtml, {
    headers: {'content-type': 'text/html;charset=utf-8'}
  });
}

const navigationRoute = new NavigationRoute(myHandler);
registerRoute(navigationRoute);

registerRoute(/\/connect\/DashboardEndpoint\/.*/, new CacheableEndpoint(), 'POST');

// registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));