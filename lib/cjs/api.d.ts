import Certificate from './certificate';
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
