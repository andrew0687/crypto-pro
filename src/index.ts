// require('./vendor/cadesplugin_api');
import * as cryptoService from './api';

const canPromise = Boolean(window.Promise);
let errorMsg: Error | null = null;
let loadedPlugin = false;
const onLoadCallbacs: VoidFunction[] = [];
const execOnloadQueue = () => {
    onLoadCallbacs.forEach((callback) => {
        callback();
    });
};
const passToWaitOnLoad = (callback: VoidFunction) => {
    if (typeof callback === 'function') {
        onLoadCallbacs.push(callback);
    }
};
const callOnLoad = (method: VoidFunction) => {
    loadedPlugin ? method() : passToWaitOnLoad(method);
};
const finishLoading = () => {
    loadedPlugin = true;
    execOnloadQueue();
};

type ServicesType = typeof cryptoService;
type MethodType = keyof ServicesType;
type ServiceType<T extends MethodType> = ServicesType[T];
// type Awaited<T> = T extends PromiseLike<infer U> ? U : T
export const call = <T extends MethodType, P extends Parameters<ServiceType<T>>>(methodName: T, ...args: P): Promise<Awaited<ReturnType<ServiceType<T>>>> => {
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
            errorMsg = new Error('КриптоПРО ЭЦП Browser Plug-In не доступен');
            finishLoading();
        });
    } else {
        errorMsg = new Error('Не поддерживаются промисы. Необходим полифилл.');
    }
} else {
    errorMsg = new Error('Не подключен модуль для работы с cades plugin');
}
