var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// require('./vendor/cadesplugin_api');
import * as cryptoService from './api';
export { default as Certificate } from './certificate';
var canPromise = Boolean(window.Promise);
var errorMsg = null;
var loadedPlugin = false;
var onLoadCallbacs = [];
var execOnloadQueue = function () {
    onLoadCallbacs.forEach(function (callback) {
        callback();
    });
};
var passToWaitOnLoad = function (callback) {
    if (typeof callback === 'function') {
        onLoadCallbacs.push(callback);
    }
};
var callOnLoad = function (method) {
    loadedPlugin ? method() : passToWaitOnLoad(method);
};
var finishLoading = function () {
    loadedPlugin = true;
    execOnloadQueue();
};
// type Awaited<T> = T extends PromiseLike<infer U> ? U : T
export var call = function (methodName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        callOnLoad(function () {
            if (errorMsg) {
                reject(errorMsg);
            }
            var method = cryptoService[methodName];
            // @ts-ignore
            method.apply(void 0, __spreadArray([], __read(args), false)).then(resolve, reject);
        });
    });
};
if (cadesplugin) {
    // ?????????????? ?????????????? (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
    if (canPromise) {
        cadesplugin.then(finishLoading, function () {
            errorMsg = new Error('?????????????????? ?????? Browser Plug-In ???? ????????????????');
            finishLoading();
        });
    }
    else {
        errorMsg = new Error('???? ???????????????????????????? ??????????????. ?????????????????? ????????????????.');
    }
}
else {
    errorMsg = new Error('???? ?????????????????? ???????????? ?????? ???????????? ?? cades plugin');
}
