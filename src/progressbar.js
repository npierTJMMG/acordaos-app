import NProgress from 'nprogress';
import { isLogged } from './services/auth'

const progressShowDelay = 100;
let routeResolved = false;

function tryInitProgress() {
    routeResolved = false;
    setTimeout(() => {
        if (!routeResolved) {
            NProgress.start();
        }
    }, progressShowDelay);
}
export default function initProgress(router) {
    router.beforeEach((to, from, next) => {
        tryInitProgress();

        if (to.meta.auth && !isLogged()) {
            routeResolved = true;
            return next({ name: 'Login' })
        } else {
            if (to.name === "Login" && isLogged()) {
                return next({ name: 'Admin' })
            }
            return next()
        }

    });

    router.afterEach(() => {
        routeResolved = true;
        NProgress.done();
    });
}
