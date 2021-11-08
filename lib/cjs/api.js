"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.isValidCadesVersion = exports.isValidCSPVersion = exports.getSystemInfo = exports.signDataXML = exports.signBase64 = exports.signData = exports.xmlSignCreate = exports.getCert = exports.getCertsList = exports.isValidEDSSettings = void 0;
/* eslint-disable new-cap */
var cryptoCommon = __importStar(require("./common"));
// import cryptoConstants from './constants';
var common_1 = require("./common");
var cadesPlugin = cadesplugin;
var _certListCache;
var getErrors = function (msg, error) {
    if (cadesPlugin) {
        return "" + msg + cadesPlugin.getLastError(error);
    }
    return "" + msg + (error.message || error.toString());
};
var Certificate = /** @class */ (function () {
    function Certificate(item) {
        this.getDecodedExtendedKeyUsage = cryptoCommon.getDecodedExtendedKeyUsage;
        this.hasExtendedKeyUsage = cryptoCommon.hasExtendedKeyUsage;
        this._cert = item._cert;
        this.thumbprint = item.thumbprint;
        this.subjectName = item.subjectName;
        this.issuerName = item.issuerName;
        this.validFrom = (0, common_1.getReadableDate)(item.validFrom);
        this.validTo = (0, common_1.getReadableDate)(item.validTo);
        this.prepareCertInfo();
    }
    Certificate.prototype.prepareCertInfo = function () {
        var name = this.subjectName.match(/CN=(.+?)(?:,|$)/);
        var sn = this.subjectName.match(/SN=(.+?)(?:,|$)/);
        var g = this.subjectName.match(/G=(.+?)(?:,|$)/);
        var o = this.subjectName.match(/O=(.+?)(?:,|$)/);
        // Удалось ли вытащить Common Name
        if (name && name[1]) {
            this.name = name[1];
        }
        if (sn && g) {
            this.name = sn[1] + ' ' + g[1];
        }
        this.organization = this.name;
        if (o) {
            this.organization = o[1];
        }
        this.label = this.name + ' (до ' + this.validTo + ')';
    };
    Object.defineProperty(Certificate.prototype, "certInfo", {
        get: function () {
            return {
                name: this.name,
                thumbprint: this.thumbprint,
                subjectName: this.subjectName,
                issuerName: this.issuerName,
                validFrom: this.validFrom,
                validTo: this.validTo,
                organization: this.organization,
                label: this.label,
            };
        },
        enumerable: false,
        configurable: true
    });
    // Проверяет, валиден ли сертификат
    Certificate.prototype.isValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cert, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, cert.IsValid()];
                    case 2:
                        result = _a.sent(); // eslint-disable-line
                        return [4 /*yield*/, result.Result];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при проверке сертификата: ', err_1))];
                    case 5: return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    // Достает указанное свойство у сертификата
    Certificate.prototype.getProp = function (propName) {
        return __awaiter(this, void 0, void 0, function () {
            var cert, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cert[propName]];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при обращении к свойству сертификата: ', err_2))];
                    case 4: return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    // Экспорт base64 представления сертификата пользователя
    Certificate.prototype.exportBase64 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cert, base64, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cert.Export(cadesPlugin.CADESCOM_ENCODE_BASE64)];
                    case 2:
                        base64 = _a.sent(); // eslint-disable-line
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при экспорте сертификата: ', err_3))];
                    case 4: return [2 /*return*/, Promise.resolve(base64)];
                }
            });
        });
    };
    // Кэшируем ПИН
    Certificate.prototype.setCachePin = function (cachePin) {
        return __awaiter(this, void 0, void 0, function () {
            var cert, privKey, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        cachePin = typeof cachePin === 'undefined' ? true : Boolean(cachePin);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, cert.PrivateKey];
                    case 2:
                        privKey = _a.sent();
                        return [4 /*yield*/, privKey.propset_CachePin(cachePin)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при изменении CachePin: ', err_4))];
                    case 5: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    /**
     * Возвращает информацию об алгоритме
     *
     * @return {Promise} -- объект с названием алгоритма {Object}
     * */
    Certificate.prototype.getAlgorithm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cert, result, algorithm, _a, _b, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cert = this._cert;
                        result = {};
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, cert.PublicKey()];
                    case 2:
                        algorithm = _c.sent();
                        return [4 /*yield*/, algorithm.Algorithm];
                    case 3:
                        algorithm = _c.sent();
                        _a = result;
                        return [4 /*yield*/, algorithm.FriendlyName];
                    case 4:
                        _a.algorithm = _c.sent();
                        _b = result;
                        return [4 /*yield*/, algorithm.Value];
                    case 5:
                        _b.oid = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_5 = _c.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при получении алгоритма: ', err_5))];
                    case 7: return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    // Разбирает информацию сертификата по тэгам
    Certificate.prototype.getCertInfo = function (tags, propName) {
        return __awaiter(this, void 0, void 0, function () {
            var cert, propInfo, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cert[propName]];
                    case 2:
                        propInfo = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при извлечении данных из сертификата: ', err_6))];
                    case 4: return [2 /*return*/, Promise.resolve(cryptoCommon.parseCertInfo(tags, propInfo))];
                }
            });
        });
    };
    // Разбирает SubjectName сертификата по тэгам
    Certificate.prototype.getOwnerInfo = function () {
        return this.getCertInfo(cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
    };
    // Разбирает IssuerName сертификата по тэгам
    Certificate.prototype.getIssuerInfo = function () {
        return this.getCertInfo(cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
    };
    /**
     * Получение OID сертификата
     *
     * @return {Array} Возвращает массив OID (улучшенного ключа)
     * */
    Certificate.prototype.getExtendedKeyUsage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cert, OIDS, count, item, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cert = this._cert;
                        OIDS = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, cert.ExtendedKeyUsage()];
                    case 2:
                        count = _a.sent();
                        return [4 /*yield*/, count.EKUs];
                    case 3:
                        count = _a.sent();
                        return [4 /*yield*/, count.Count];
                    case 4:
                        count = _a.sent();
                        if (!count) return [3 /*break*/, 10];
                        _a.label = 5;
                    case 5:
                        if (!(count > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, cert.ExtendedKeyUsage()];
                    case 6:
                        item = _a.sent();
                        return [4 /*yield*/, item.EKUs];
                    case 7:
                        item = _a.sent();
                        return [4 /*yield*/, item.Item(count)];
                    case 8:
                        item = _a.sent();
                        return [4 /*yield*/, item.OID];
                    case 9:
                        item = _a.sent();
                        OIDS.push(item);
                        count--;
                        return [3 /*break*/, 5];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(getErrors('Ошибка при получении ОИД\'ов: ', err_7))];
                    case 12: return [2 /*return*/, Promise.resolve(OIDS)];
                }
            });
        });
    };
    return Certificate;
}());
// Проверяет корректность настроек ЭП на машине
var isValidEDSSettings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 2];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.About')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw new Error('Настройки ЭП на данной машине не верны');
            case 4: return [2 /*return*/, Promise.resolve()];
        }
    });
}); };
exports.isValidEDSSettings = isValidEDSSettings;
// Получить сертификат в формате cades по хэшу
var getCadesCert = function (hash) { return __awaiter(void 0, void 0, void 0, function () {
    var oStore, certs, certCnt, cert, err_8, err_9, count, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 2];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.Store')];
            case 1:
                oStore = _a.sent();
                _a.label = 2;
            case 2:
                if (!oStore) {
                    throw new Error('Не удалось получить доступ к хранилищу сертификатов');
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, oStore.Open(cadesPlugin.CAPICOM_CURRENT_USER_STORE, cadesPlugin.CAPICOM_MY_STORE, cadesPlugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_8 = _a.sent();
                throw new Error(getErrors('Ошибка при открытии хранилища: ', err_8));
            case 6:
                _a.trys.push([6, 9, , 10]);
                return [4 /*yield*/, oStore.Certificates];
            case 7:
                certs = _a.sent();
                return [4 /*yield*/, certs.Count];
            case 8:
                certCnt = _a.sent();
                return [3 /*break*/, 10];
            case 9:
                err_9 = _a.sent();
                throw new Error(getErrors('Ошибка получения списка сертификатов: ', err_9));
            case 10:
                if (!certCnt) {
                    throw new Error('Нет доступных сертификатов');
                }
                _a.label = 11;
            case 11:
                _a.trys.push([11, 17, , 18]);
                return [4 /*yield*/, certs.Find(cadesPlugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, hash)];
            case 12:
                certs = _a.sent();
                return [4 /*yield*/, certs.Count];
            case 13:
                count = _a.sent();
                if (!count) return [3 /*break*/, 15];
                return [4 /*yield*/, certs.Item(1)];
            case 14:
                cert = _a.sent();
                return [3 /*break*/, 16];
            case 15: return [2 /*return*/, Promise.reject(new Error(hash))];
            case 16: return [3 /*break*/, 18];
            case 17:
                err_10 = _a.sent();
                throw new Error('Не удалось получить сертификат по хэшу: ' + err_10.message);
            case 18: return [4 /*yield*/, oStore.Close()];
            case 19:
                _a.sent();
                return [2 /*return*/, Promise.resolve(cert)];
        }
    });
}); };
/**
 * Возвращает список сертификатов, доступных в системе
 *
 * @param {Boolean} [resetCache=false] -- нужно ли сбросить кэш списка сертификатов
 * @return {Promise} -- со списком сертификатов {Array}
 * */
var getCertsList = function (resetCache) {
    if (resetCache === void 0) { resetCache = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var oStore, result, certs, count, item, err_11, err_12, _a, _b, _c, err_13;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!resetCache && _certListCache) {
                        return [2 /*return*/, Promise.resolve(_certListCache)];
                    }
                    if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 2];
                    return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.Store')];
                case 1:
                    oStore = _e.sent();
                    _e.label = 2;
                case 2:
                    if (!oStore) {
                        throw new Error('Не удалось получить доступ к хранилищу сертификатов');
                    }
                    result = [];
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, oStore.Open(cadesPlugin.CAPICOM_CURRENT_USER_STORE, cadesPlugin.CAPICOM_MY_STORE, cadesPlugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED)];
                case 4:
                    _e.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_11 = _e.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Ошибка при открытии хранилища: ', err_11))];
                case 6:
                    _e.trys.push([6, 12, , 13]);
                    return [4 /*yield*/, oStore.Certificates];
                case 7:
                    certs = _e.sent();
                    if (!certs) return [3 /*break*/, 11];
                    return [4 /*yield*/, certs.Find(cadesPlugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID)];
                case 8:
                    certs = _e.sent();
                    return [4 /*yield*/, certs.Find(cadesPlugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY, cadesPlugin.CAPICOM_PROPID_KEY_PROV_INFO)];
                case 9:
                    /**
                     * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
                     * или не действительны на данный момент
                     * */
                    certs = _e.sent();
                    return [4 /*yield*/, certs.Count];
                case 10:
                    count = _e.sent();
                    _e.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_12 = _e.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Ошибка получения списка сертификатов: ', err_12))];
                case 13:
                    if (!count) {
                        return [2 /*return*/, Promise.reject(new Error('Нет доступных сертификатов'))];
                    }
                    _e.label = 14;
                case 14:
                    if (!count) return [3 /*break*/, 25];
                    _e.label = 15;
                case 15:
                    _e.trys.push([15, 23, , 24]);
                    return [4 /*yield*/, certs.Item(count)];
                case 16:
                    item = _e.sent();
                    _b = (_a = result).push;
                    _c = Certificate.bind;
                    _d = {};
                    return [4 /*yield*/, item];
                case 17:
                    _d._cert = _e.sent();
                    return [4 /*yield*/, item.Thumbprint];
                case 18:
                    _d.thumbprint = _e.sent();
                    return [4 /*yield*/, item.SubjectName];
                case 19:
                    _d.subjectName = _e.sent();
                    return [4 /*yield*/, item.IssuerName];
                case 20:
                    _d.issuerName = _e.sent();
                    return [4 /*yield*/, item.ValidFromDate];
                case 21:
                    _d.validFrom = _e.sent();
                    return [4 /*yield*/, item.ValidToDate];
                case 22:
                    _b.apply(_a, [new (_c.apply(Certificate, [void 0, (_d.validTo = _e.sent(),
                                _d)]))()]);
                    count--;
                    return [3 /*break*/, 24];
                case 23:
                    err_13 = _e.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Ошибка обработки сертификатов: ', err_13))];
                case 24: return [3 /*break*/, 14];
                case 25: return [4 /*yield*/, oStore.Close()];
                case 26:
                    _e.sent();
                    // eslint-disable-next-line require-atomic-updates
                    _certListCache = __spreadArray([], __read(result), false);
                    return [2 /*return*/, Promise.resolve(_certListCache)];
            }
        });
    });
};
exports.getCertsList = getCertsList;
// Получить сертификат по хэшу
var getCert = function (hash) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!hash) {
            throw new Error('Хэш не указан');
        }
        return [2 /*return*/, (0, exports.getCertsList)().then(function (list) {
                var foundCert;
                list.some(function (cert) {
                    if (hash === cert.thumbprint) {
                        foundCert = cert;
                        return true;
                    }
                    return false;
                });
                if (foundCert) {
                    return Promise.resolve(foundCert);
                }
                else {
                    return Promise.reject(new Error('Сертификат с хэшем: "' + hash + '" не найден'));
                }
            }, Promise.reject)];
    });
}); };
exports.getCert = getCert;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
var xmlSignCreate = function (hash, dataBase64) { return __awaiter(void 0, void 0, void 0, function () {
    var cert, oSignedData, oHashedData, oSigner, signature, sHashValue, err_14, err_15, err_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCadesCert(hash)];
            case 1:
                cert = _a.sent();
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 21];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData')];
            case 2:
                oSignedData = _a.sent();
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.HashedData')];
            case 3:
                oHashedData = _a.sent();
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner')];
            case 4:
                oSigner = _a.sent();
                signature = void 0;
                sHashValue = void 0;
                _a.label = 5;
            case 5:
                _a.trys.push([5, 13, , 14]);
                return [4 /*yield*/, oSigner.propset_Certificate(cert)];
            case 6:
                _a.sent();
                return [4 /*yield*/, oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)];
            case 7:
                _a.sent();
                return [4 /*yield*/, oHashedData.propset_Algorithm(cadesPlugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411)];
            case 8:
                _a.sent();
                return [4 /*yield*/, oHashedData.propset_DataEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY)];
            case 9:
                _a.sent();
                return [4 /*yield*/, oHashedData.Hash(dataBase64)];
            case 10:
                _a.sent();
                return [4 /*yield*/, oHashedData.Value];
            case 11:
                sHashValue = _a.sent();
                return [4 /*yield*/, oSignedData.propset_Content(sHashValue)];
            case 12:
                _a.sent();
                return [3 /*break*/, 14];
            case 13:
                err_14 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err_14))];
            case 14:
                _a.trys.push([14, 16, , 17]);
                return [4 /*yield*/, oSignedData.SignHash(oHashedData, oSigner, cadesPlugin.CADESCOM_CADES_BES)];
            case 15:
                signature = _a.sent();
                return [3 /*break*/, 17];
            case 16:
                err_15 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось создать подпись: ', err_15))];
            case 17:
                _a.trys.push([17, 19, , 20]);
                return [4 /*yield*/, oSignedData.VerifyHash(oHashedData, signature, cadesPlugin.CADESCOM_CADES_BES)];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                err_16 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось проверить подпись: ', err_16))];
            case 20: return [2 /*return*/, Promise.resolve(signature)];
            case 21: return [2 /*return*/, Promise.reject(new Error('Что-то пошло не так'))];
        }
    });
}); };
exports.xmlSignCreate = xmlSignCreate;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @param {Boolean} signType -- тип подписи открепленная (true) / присоединенная (false) (default: true)
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
var signData = function (hash, dataBase64, signType) {
    if (signType === void 0) { signType = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var cert, clientTime, oAttrs, oSignedData, oSigner, attrs, signature, err_17, err_18, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCadesCert(hash)];
                case 1:
                    cert = _a.sent();
                    clientTime = new Date();
                    if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 21];
                    return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CPAttribute')];
                case 2:
                    oAttrs = _a.sent();
                    return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData')];
                case 3:
                    oSignedData = _a.sent();
                    return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner')];
                case 4:
                    oSigner = _a.sent();
                    attrs = void 0;
                    signature = void 0;
                    clientTime = cryptoCommon.getDateObj(clientTime);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, oAttrs.propset_Name(cadesPlugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, oAttrs.propset_Value(clientTime)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_17 = _a.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Ошибка при установке данных подписи: ', err_17))];
                case 9:
                    _a.trys.push([9, 16, , 17]);
                    return [4 /*yield*/, oSigner.propset_Certificate(cert)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, oSigner.AuthenticatedAttributes2];
                case 11:
                    attrs = _a.sent();
                    return [4 /*yield*/, attrs.Add(oAttrs)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, oSignedData.propset_ContentEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, oSignedData.propset_Content(dataBase64)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY)];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 16:
                    err_18 = _a.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err_18))];
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, oSignedData.SignCades(oSigner, cadesPlugin.CADESCOM_CADES_BES, signType)];
                case 18:
                    signature = _a.sent();
                    return [3 /*break*/, 20];
                case 19:
                    err_19 = _a.sent();
                    return [2 /*return*/, Promise.reject(getErrors('Не удалось создать подпись: ', err_19))];
                case 20: return [2 /*return*/, Promise.resolve(signature)];
                case 21: return [2 /*return*/, Promise.reject(new Error('Что-то пошло не так'))];
            }
        });
    });
};
exports.signData = signData;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
var signBase64 = function (hash, dataBase64) { return __awaiter(void 0, void 0, void 0, function () {
    var cert, oSignedData, oSigner, signature, err_20, err_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCadesCert(hash)];
            case 1:
                cert = _a.sent();
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 14];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData')];
            case 2:
                oSignedData = _a.sent();
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner')];
            case 3:
                oSigner = _a.sent();
                signature = void 0;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 9, , 10]);
                return [4 /*yield*/, oSigner.propset_Certificate(cert)];
            case 5:
                _a.sent();
                return [4 /*yield*/, oSignedData.propset_ContentEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY)];
            case 6:
                _a.sent();
                return [4 /*yield*/, oSignedData.propset_Content(dataBase64)];
            case 7:
                _a.sent();
                return [4 /*yield*/, oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN)];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                err_20 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err_20))];
            case 10:
                _a.trys.push([10, 12, , 13]);
                return [4 /*yield*/, oSignedData.SignCades(oSigner, cadesPlugin.CADESCOM_CADES_BES)];
            case 11:
                signature = _a.sent();
                signature = String(signature).replace(/\s/gm, '');
                return [3 /*break*/, 13];
            case 12:
                err_21 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось создать подпись: ', err_21))];
            case 13: return [2 /*return*/, Promise.resolve(signature)];
            case 14: return [2 /*return*/, Promise.reject(new Error('Что-то пошло не так'))];
        }
    });
}); };
exports.signBase64 = signBase64;
/**
 * Создает подпись XML строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataXML -- данные в формате XML
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
var signDataXML = function (hash, dataXML) { return __awaiter(void 0, void 0, void 0, function () {
    var cert, oSigner, signerXML, signature, err_22, err_23, oSignedXML2, err_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCadesCert(hash)];
            case 1:
                cert = _a.sent();
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 21];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner')];
            case 2:
                oSigner = _a.sent();
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.SignedXML')];
            case 3:
                signerXML = _a.sent();
                signature = void 0;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 11, , 12]);
                return [4 /*yield*/, oSigner.propset_Certificate(cert)];
            case 5:
                _a.sent();
                return [4 /*yield*/, oSigner.propset_CheckCertificate(true)];
            case 6:
                _a.sent();
                // Добавляем данные для подписи
                return [4 /*yield*/, signerXML.propset_Content(dataXML)];
            case 7:
                // Добавляем данные для подписи
                _a.sent();
                // Устанавливаем тип подписи
                return [4 /*yield*/, signerXML.propset_SignatureType(cadesPlugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED)];
            case 8:
                // Устанавливаем тип подписи
                _a.sent();
                // Устанавливаем алгоритм подписи
                return [4 /*yield*/, signerXML.propset_SignatureMethod(cadesPlugin.XmlDsigGost3410Url2012256)];
            case 9:
                // Устанавливаем алгоритм подписи
                _a.sent();
                // Устанавливаем алгоритм хэширования
                return [4 /*yield*/, signerXML.propset_DigestMethod(cadesPlugin.XmlDsigGost3411Url2012256)];
            case 10:
                // Устанавливаем алгоритм хэширования
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                err_22 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err_22))];
            case 12:
                _a.trys.push([12, 14, , 15]);
                return [4 /*yield*/, signerXML.Sign(oSigner)];
            case 13:
                signature = _a.sent();
                return [3 /*break*/, 15];
            case 14:
                err_23 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Не удалось создать подпись: ', err_23))];
            case 15: return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.SignedXML')];
            case 16:
                oSignedXML2 = _a.sent();
                _a.label = 17;
            case 17:
                _a.trys.push([17, 19, , 20]);
                return [4 /*yield*/, oSignedXML2.Verify(signature)];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                err_24 = _a.sent();
                return [2 /*return*/, Promise.reject(getErrors('Failed to verify signature. Error: ', err_24))];
            case 20: return [2 /*return*/, Promise.resolve(signature)];
            case 21: return [2 /*return*/, Promise.reject(new Error('Что-то пошло не так'))];
        }
    });
}); };
exports.signDataXML = signDataXML;
// Возвращает информацию о версии CSP и плагина
var getSystemInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sysInfo, e, cadesVersion, cspVersion, _a, _b, _c, err_25;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                sysInfo = __assign({}, cryptoCommon.getEnvInfo());
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                if (!('CreateObjectAsync' in cadesPlugin)) return [3 /*break*/, 10];
                return [4 /*yield*/, cadesPlugin.CreateObjectAsync('CAdESCOM.About')];
            case 2:
                e = _d.sent();
                return [4 /*yield*/, e.PluginVersion];
            case 3:
                cadesVersion = _d.sent();
                return [4 /*yield*/, e.CSPVersion()];
            case 4:
                cspVersion = _d.sent();
                if (!!cadesVersion) return [3 /*break*/, 6];
                _a = sysInfo;
                return [4 /*yield*/, e.Version];
            case 5:
                _a.cadesVersion = _d.sent();
                return [3 /*break*/, 8];
            case 6:
                _b = sysInfo;
                return [4 /*yield*/, cadesVersion.toString()];
            case 7:
                _b.cadesVersion = _d.sent();
                _d.label = 8;
            case 8:
                _c = sysInfo;
                return [4 /*yield*/, cspVersion.toString()];
            case 9:
                _c.cspVersion = _d.sent();
                return [2 /*return*/, Promise.resolve(sysInfo)];
            case 10: return [2 /*return*/, Promise.reject(new Error('Что-то пошло не так'))];
            case 11:
                err_25 = _d.sent();
                return [2 /*return*/, Promise.reject(getErrors('Ошибка при получении информации о системе: ', err_25))];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getSystemInfo = getSystemInfo;
// Promise обертка для синхронного вызова проверки версии CSP
var isValidCSPVersion = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Promise.resolve(cryptoCommon.isValidCSPVersion(version))];
    });
}); };
exports.isValidCSPVersion = isValidCSPVersion;
// Promise обертка для синхронного вызова проверки версии плагина
var isValidCadesVersion = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, Promise.resolve(cryptoCommon.isValidCadesVersion(version))];
    });
}); };
exports.isValidCadesVersion = isValidCadesVersion;
