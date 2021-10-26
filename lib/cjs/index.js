"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.call = void 0;
// require('./vendor/cadesplugin_api');
var cryptoService = __importStar(require("./api"));
var canPromise = Boolean(window.Promise);
var errorMsg = '';
var loadedPlugin = false;
var onLoadCallbacs = [];
var execOnloadQueue = function () {
    onLoadCallbacs.forEach(function (callback) {
        callback();
    });
};
var passToWaitOnLoad = function (callback) {
    if (Object.prototype.toString.call(callback) === '[object Function]') {
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
var call = function (methodName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // const args = Array.prototype.slice.call(props); // eslint-disable-line
    // const methodName = args.shift();
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
exports.call = call;
if (cadesplugin) {
    // Уровень отладки (LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, LOG_LEVEL_ERROR)
    cadesplugin.set_log_level(cadesplugin.LOG_LEVEL_ERROR);
    if (canPromise) {
        cadesplugin.then(finishLoading, function () {
            errorMsg = 'КриптоПРО ЭЦП Browser Plug-In не доступен';
            finishLoading();
        });
    }
    else {
        console.error(new Error('Не поддерживаются промисы. Необходим полифилл.'));
    }
}
else {
    console.error(new Error('Не подключен модуль для работы с cades plugin'));
}
