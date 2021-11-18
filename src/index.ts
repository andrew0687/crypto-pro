// require('./vendor/cadesplugin_api');
import * as cryptoService from './api';

const canPromise = Boolean(window.Promise);
let errorMsg = '';
let loadedPlugin = false;
const onLoadCallbacs: any[] = [];
const execOnloadQueue = () => {
    onLoadCallbacs.forEach((callback) => {
        callback();
    });
};
const passToWaitOnLoad = (callback: any) => {
    if (Object.prototype.toString.call(callback) === '[object Function]') {
        onLoadCallbacs.push(callback);
    }
};
const callOnLoad = (method: any) => {
    loadedPlugin ? method() : passToWaitOnLoad(method);
};
const finishLoading = () => {
    loadedPlugin = true;
    execOnloadQueue();
};

type MethodType = keyof typeof cryptoService;
type ServiceType<T extends MethodType> = typeof cryptoService[T];
// type Awaited<T> = T extends PromiseLike<infer U> ? U : T
export const call = <T extends MethodType, P extends Parameters<ServiceType<T>>>(methodName: T, ...args: P): Promise<Awaited<ReturnType<ServiceType<T>>>> => {
    // const args = Array.prototype.slice.call(props); // eslint-disable-line
    // const methodName = args.shift();
    return new Promise((resolve, reject) => {
        callOnLoad(() => {
            if (errorMsg) {
                reject(errorMsg);
            }
            const method = cryptoService[methodName];
            // @ts-ignore
            method(...args).then(resolve, reject);
        });
    });
};
if (cadesplugin) {
    // Уровень отладки (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
    if (canPromise) {
        cadesplugin.then(finishLoading, () => {
            errorMsg = 'КриптоПРО ЭЦП Browser Plug-In не доступен';
            finishLoading();
        });
    } else {
        console.error(new Error('Не поддерживаются промисы. Необходим полифилл.'));
    }
} else {
    console.error(new Error('Не подключен модуль для работы с cades plugin'));
}
