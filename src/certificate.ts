import * as cryptoCommon from './common';
import {
    getReadableDate,
    getErrors,
    type TagsType,
} from './common';

const cadesPlugin = cadesplugin;

interface ICertificate {
    _cert: CAPICOM.CertificateAsync;
    thumbprint: string;
    subjectName: string;
    issuerName: string;
    validFrom: any;
    validTo: any;
}

interface IAlgorithm {
    algorithm: string;
    oid: string;
}

interface ICertInfo {
    name: string | undefined;
    thumbprint: string;
    subjectName: string;
    issuerName: string;
    validFrom: string | Date;
    validTo: string | Date;
    organization: string | undefined;
    // label: string | undefined;
}

export default class Certificate {
    getDecodedExtendedKeyUsage = cryptoCommon.getDecodedExtendedKeyUsage;
    hasExtendedKeyUsage = cryptoCommon.hasExtendedKeyUsage;
    readonly _cert: CAPICOM.CertificateAsync;
    public readonly thumbprint: string;
    public readonly subjectName: string;
    public readonly issuerName: string;
    public readonly validFrom: string;
    public readonly validTo: string;
    public name?: string;
    public organization?: string;
    constructor(item: ICertificate) {
        this._cert = item._cert;
        this.thumbprint = item.thumbprint;
        this.subjectName = item.subjectName;
        this.issuerName = item.issuerName;
        this.validFrom = getReadableDate(item.validFrom);
        this.validTo = getReadableDate(item.validTo);
        this.prepareCertInfo();
    }
    prepareCertInfo() {
        const name = this.subjectName.match(/CN=(.+?)(?:,|$)/);
        const sn = this.subjectName.match(/SN=(.+?)(?:,|$)/);
        const g = this.subjectName.match(/G=(.+?)(?:,|$)/);
        const o = this.subjectName.match(/O=(.+?)(?:,|$)/);
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
        // this.label = this.name + ' (до ' + this.validTo + ')';
    }
    get certInfo(): ICertInfo {
        return {
            name: this.name,
            thumbprint: this.thumbprint,
            subjectName: this.subjectName,
            issuerName: this.issuerName,
            validFrom: this.validFrom,
            validTo: this.validTo,
            organization: this.organization,
            // label: this.label,
        };
    }
    // Проверяет, валиден ли сертификат
    async isValid() {
        const cert = this._cert;
        let result;
        try {
            result = await cert.IsValid(); // eslint-disable-line
            result = await result.Result;
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при проверке сертификата: ', err));
        }
        return Promise.resolve(result);
    }

    // Достает указанное свойство у сертификата
    async getProp(propName: keyof CAPICOM.CertificateAsync) {
        const cert = this._cert;
        let result;
        try {
            result = await cert[propName];
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при обращении к свойству сертификата: ', err));
        }
        return Promise.resolve(result);
    }

    // Экспорт base64 представления сертификата пользователя
    async exportBase64() {
        const cert = this._cert;
        let base64;
        try {
            base64 = await cert.Export(cadesPlugin.CADESCOM_ENCODE_BASE64); // eslint-disable-line
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при экспорте сертификата: ', err));
        }
        return Promise.resolve(base64);
    }

    // Кэшируем ПИН
    async setCachePin(cachePin: any) {
        const cert = this._cert;
        cachePin = typeof cachePin === 'undefined' ? true : Boolean(cachePin);
        let privKey;
        try {
            privKey = await cert.PrivateKey;
            await privKey.propset_CachePin(cachePin);
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при изменении CachePin: ', err));
        }
        return Promise.resolve();
    }
    /**
     * Возвращает информацию об алгоритме
     *
     * @return {Promise} -- объект с названием алгоритма {Object}
     * */
    async getAlgorithm() {
        const cert = this._cert;
        const result: Partial<IAlgorithm> = {};
        let algorithm;
        try {
            algorithm = await cert.PublicKey();
            algorithm = await algorithm.Algorithm;
            result.algorithm = await algorithm.FriendlyName;
            result.oid = await algorithm.Value;
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при получении алгоритма: ', err));
        }
        return Promise.resolve(result as IAlgorithm);
    }

    // Разбирает информацию сертификата по тэгам
    async getCertInfo(tags: TagsType, propName: 'IssuerName' | 'SubjectName') {
        const cert = this._cert; // eslint-disable-line
        let propInfo;
        try {
            propInfo = await cert[propName];
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при извлечении данных из сертификата: ', err));
        }
        return Promise.resolve(cryptoCommon.parseCertInfo(tags, propInfo));
    }

    /**
     * Разбирает SubjectName сертификата по тэгам
     * @return {Array} -- возвращает массив свойств сертификата о владельце
     */
    getOwnerInfo() {
        return this.getCertInfo(cryptoCommon.subjectNameTagsTranslations, 'SubjectName');
    }

    /**
     * Разбирает IssuerName сертификата по тэгам
     * @return {Array} -- возвращает массив свойств сертификата об УЦ
     */
    getIssuerInfo() {
        return this.getCertInfo(cryptoCommon.issuerNameTagsTranslations, 'IssuerName');
    }

    /**
     * Получение OID сертификата
     *
     * @return {Array} -- Возвращает массив OID (улучшенного ключа)
     * */
    async getExtendedKeyUsage() {
        const cert = this._cert;
        const OIDS: string[] = [];
        let count;
        let item;
        try {
            count = await cert.ExtendedKeyUsage();
            count = await count.EKUs;
            count = await count.Count;
            if (count) {
                while (count > 0) {
                    item = await cert.ExtendedKeyUsage();
                    item = await item.EKUs;
                    item = await item.Item(count);
                    item = await item.OID;
                    OIDS.push(item);
                    count--;
                }
            }
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при получении ОИД\'ов: ', err));
        }
        return Promise.resolve(OIDS);
    }
}
