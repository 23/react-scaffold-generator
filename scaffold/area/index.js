import localRoutes from './routes';
import localReducers from './reducers';

export default (urlNamespace, routes, reducers) => {
  localRoutes.path = urlNamespace;
  routes.push(localRoutes);

  reducers.__AREA_SEGMENT__ = localReducers;
};