import localRoutes from './routes';
import localReducer from './reducer';

export default (urlNamespace, routes, reducers) => {
  localRoutes.path = urlNamespace;
  routes.push(localRoutes);

  reducers.__AREA_SEGMENT__ = localReducer;
};