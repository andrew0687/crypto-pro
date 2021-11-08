/// <reference types="cadesplugin" />
import { TagsType } from './common';
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
    label: string | undefined;
}
declare class Certificate {
    getDecodedExtendedKeyUsage: () => Promise<unknown>;
    hasExtendedKeyUsage: (oids: string | string[]) => Promise<unknown>;
    readonly _cert: CAPICOM.CertificateAsync;
    thumbprint: string;
    subjectName: string;
    issuerName: string;
    validFrom: string;
    validTo: string;
    name?: string;
    organization?: string;
    label?: string;
    constructor(item: ICertificate);
    prepareCertInfo(): void;
    get certInfo(): ICertInfo;
    isValid(): Promise<boolean>;
    getProp(propName: keyof CAPICOM.CertificateAsync): Promise<string | number | object>;
    exportBase64(): Promise<string>;
    setCachePin(cachePin: any): Promise<void>;
    /**
     * Возвращает информацию об алгоритме
     *
     * @return {Promise} -- объект с названием алгоритма {Object}
     * */
    getAlgorithm(): Promise<IAlgorithm>;
    getCertInfo(tags: TagsType, propName: 'IssuerName' | 'SubjectName'): Promise<{
        title: string;
        descr: string;
        translated: boolean;
    }[] | null>;
    getOwnerInfo(): Promise<{
        title: string;
        descr: string;
        translated: boolean;
    }[] | null>;
    getIssuerInfo(): Promise<{
        title: string;
        descr: string;
        translated: boolean;
    }[] | null>;
    /**
     * Получение OID сертификата
     *
     * @return {Array} Возвращает массив OID (улучшенного ключа)
     * */
    getExtendedKeyUsage(): Promise<string[]>;
}
export declare const isValidEDSSettings: () => Promise<void>;
/**
 * Возвращает список сертификатов, доступных в системе
 *
 * @param {Boolean} [resetCache=false] -- нужно ли сбросить кэш списка сертификатов
 * @return {Promise} -- со списком сертификатов {Array}
 * */
export declare const getCertsList: (resetCache?: boolean) => Promise<Certificate[]>;
export declare const getCert: (hash: string) => Promise<never>;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export declare const xmlSignCreate: (hash: string, dataBase64: string) => Promise<string>;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @param {Boolean} signType -- тип подписи открепленная (true) / присоединенная (false) (default: true)
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export declare const signData: (hash: string, dataBase64: string, signType?: boolean) => Promise<string>;
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export declare const signBase64: (hash: string, dataBase64: string) => Promise<string>;
/**
 * Создает подпись XML строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataXML -- данные в формате XML
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export declare const signDataXML: (hash: string, dataXML: string) => Promise<string>;
export declare const getSystemInfo: () => Promise<Record<string, any>>;
export declare const isValidCSPVersion: (version: string) => Promise<boolean>;
export declare const isValidCadesVersion: (version: string) => Promise<boolean>;
export {};
