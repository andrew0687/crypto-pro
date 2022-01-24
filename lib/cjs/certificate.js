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
Object.defineProperty(exports, "__esModule", { value: true });
var cryptoCommon = __importStar(require("./common"));
var common_1 = require("./common");
var cadesPlugin = cadesplugin;
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при проверке сертификата: ', err_1))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при обращении к свойству сертификата: ', err_2))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при экспорте сертификата: ', err_3))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при изменении CachePin: ', err_4))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при получении алгоритма: ', err_5))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при извлечении данных из сертификата: ', err_6))];
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
                        return [2 /*return*/, Promise.reject((0, common_1.getErrors)('Ошибка при получении ОИД\'ов: ', err_7))];
                    case 12: return [2 /*return*/, Promise.resolve(OIDS)];
                }
            });
        });
    };
    return Certificate;
}());
exports.default = Certificate;
