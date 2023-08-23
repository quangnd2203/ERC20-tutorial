import * as express from 'express';
import vaultRouter from './vault';
const router = express.Router();

const routes = [
    {
        path: '/token',
        route: vaultRouter,
    }
];

routes.forEach(
    (route) => {
        router.use(route.path, route.route);
    }
);

export default router;