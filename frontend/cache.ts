import {MiddlewareContext, MiddlewareNext} from '@vaadin/flow-frontend/Connect';

const _cache: Map<string, Response> = new Map<string, Response>();

export async function cache(context: MiddlewareContext, next: MiddlewareNext): Promise<Response> {
  try {
    const response = await next(context);
    if (context.endpoint === 'DashboardEndpoint') {
      _cache.set(`${context.endpoint}:${context.method}`, response.clone());
    }
    return response;
  } catch (e) {
    if (_cache.has(`${context.endpoint}:${context.method}`)) {
      return _cache.get(`${context.endpoint}:${context.method}`)!.clone();
    }
    throw e;
  }
}