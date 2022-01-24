/* eslint-disable new-cap */
import * as cryptoCommon from './common';
import {getErrors} from './common';
// import cryptoConstants from './constants';
import Certificate from './certificate';

const cadesPlugin = cadesplugin;
let _certListCache: Certificate[];

// Проверяет корректность настроек ЭП на машине
export const isValidEDSSettings = async () => {
    try {
        if ('CreateObjectAsync' in cadesPlugin) {
            await cadesPlugin.CreateObjectAsync('CAdESCOM.About');
        } // eslint-disable-line
    } catch (error) {
        throw new Error('Настройки ЭП на данной машине не верны');
    }
    return Promise.resolve();
};
// Получить сертификат в формате cades по хэшу
const getCadesCert = async (hash: string) => {
    let oStore;
    if ('CreateObjectAsync' in cadesPlugin) {
        oStore = await cadesPlugin.CreateObjectAsync('CAdESCOM.Store');
    }
    let certs;
    let certCnt;
    let cert;
    if (!oStore) {
        throw new Error('Не удалось получить доступ к хранилищу сертификатов');
    }
    // Открываем хранилище
    try {
        await oStore.Open(
            cadesPlugin.CAPICOM_CURRENT_USER_STORE,
            cadesPlugin.CAPICOM_MY_STORE,
            cadesPlugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
        );
    } catch (err: any) {
        throw new Error(getErrors('Ошибка при открытии хранилища: ', err));
    }
    // Получаем доступ к сертификатам
    try {
        certs = await oStore.Certificates;
        certCnt = await certs.Count;
    } catch (err: any) {
        throw new Error(getErrors('Ошибка получения списка сертификатов: ', err));
    }
    if (!certCnt) {
        throw new Error('Нет доступных сертификатов');
    }
    // Получаем сертификат по хэшу
    try {
        certs = await certs.Find(cadesPlugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, hash);
        const count = await certs.Count;
        if (count) {
            cert = await certs.Item(1);
        } else {
            return Promise.reject(new Error(hash));
        }
    } catch (err: any) {
        throw new Error('Не удалось получить сертификат по хэшу: ' + err.message);
    }
    await oStore.Close();
    return Promise.resolve(cert);
};
/**
 * Возвращает список сертификатов, доступных в системе
 *
 * @param {Boolean} [resetCache=false] -- нужно ли сбросить кэш списка сертификатов
 * @return {Promise} -- со списком сертификатов {Array}
 * */
export const getCertsList = async (resetCache = false): Promise<Certificate[]> => {
    if (!resetCache && _certListCache) {
        return Promise.resolve(_certListCache);
    }
    let oStore;
    if ('CreateObjectAsync' in cadesPlugin) {
        oStore = await cadesPlugin.CreateObjectAsync('CAdESCOM.Store');
    }
    if (!oStore) {
        throw new Error('Не удалось получить доступ к хранилищу сертификатов');
    }
    const result: Certificate[] = [];
    let certs;
    let count;
    let item;
    try {
        await oStore.Open(
            cadesPlugin.CAPICOM_CURRENT_USER_STORE,
            cadesPlugin.CAPICOM_MY_STORE,
            cadesPlugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
        );
    } catch (err: any) {
        return Promise.reject(getErrors('Ошибка при открытии хранилища: ', err));
    }
    // Получаем доступ к сертификатам
    try {
        certs = await oStore.Certificates;
        if (certs) {
            certs = await certs.Find(cadesPlugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
            /**
             * Не рассматриваются сертификаты, в которых отсутствует закрытый ключ
             * или не действительны на данный момент
             * */
            certs = await certs.Find(
                cadesPlugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY,
                cadesPlugin.CAPICOM_PROPID_KEY_PROV_INFO,
            );
            count = await certs.Count;
        }
    } catch (err: any) {
        return Promise.reject(getErrors('Ошибка получения списка сертификатов: ', err));
    }
    if (!count) {
        return Promise.reject(new Error('Нет доступных сертификатов'));
    }
    while (count) {
        try {
            item = await certs.Item(count);
            result.push(new Certificate({
                _cert: await item,
                thumbprint: await item.Thumbprint,
                subjectName: await item.SubjectName,
                issuerName: await item.IssuerName,
                validFrom: await item.ValidFromDate,
                validTo: await item.ValidToDate,
            }));
            count--;
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка обработки сертификатов: ', err));
        }
    }
    await oStore.Close();
    // eslint-disable-next-line require-atomic-updates
    _certListCache = [...result];
    return Promise.resolve(_certListCache);
};
// Получить сертификат по хэшу
export const getCert = async (hash: string) => {
    if (!hash) {
        throw new Error('Хэш не указан');
    }
    return getCertsList().then((list) => {
        let foundCert;
        list.some((cert) => {
            if (hash === cert.thumbprint) {
                foundCert = cert;
                return true;
            }
            return false;
        });
        if (foundCert) {
            return Promise.resolve(foundCert);
        } else {
            return Promise.reject(new Error('Сертификат с хэшем: "' + hash + '" не найден'));
        }
    }, Promise.reject);
};
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export const xmlSignCreate = async (hash: string, dataBase64: string) => {
    const cert = await getCadesCert(hash);
    if ('CreateObjectAsync' in cadesPlugin) {
        const oSignedData = await cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
        const oHashedData = await cadesPlugin.CreateObjectAsync('CAdESCOM.HashedData');
        const oSigner = await cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner');
        let signature;
        let sHashValue;
        // Задаем настройки для подписи
        try {
            await oSigner.propset_Certificate(cert);
            await oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
            await oHashedData.propset_Algorithm(cadesPlugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411);
            await oHashedData.propset_DataEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY);
            await oHashedData.Hash(dataBase64);
            sHashValue = await oHashedData.Value;
            await oSignedData.propset_Content(sHashValue);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err));
        }
        try {
            signature = await oSignedData.SignHash(
                oHashedData,
                oSigner,
                cadesPlugin.CADESCOM_CADES_BES,
            );
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось создать подпись: ', err));
        }
        try {
            await oSignedData.VerifyHash(oHashedData, signature, cadesPlugin.CADESCOM_CADES_BES);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось проверить подпись: ', err));
        }
        return Promise.resolve(signature);
    }
    return Promise.reject(new Error('Что-то пошло не так'));
};
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @param {Boolean} signType -- тип подписи открепленная (true) / присоединенная (false) (default: true)
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export const signData = async (hash: string, dataBase64: string, signType = true) => {
    const cert = await getCadesCert(hash);
    let clientTime = new Date();
    if ('CreateObjectAsync' in cadesPlugin) {
        const oAttrs = await cadesPlugin.CreateObjectAsync('CAdESCOM.CPAttribute');
        const oSignedData = await cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
        const oSigner = await cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner');
        let attrs;
        let signature;
        clientTime = cryptoCommon.getDateObj(clientTime);
        try {
            await oAttrs.propset_Name(cadesPlugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
            await oAttrs.propset_Value(clientTime);
        } catch (err: any) {
            return Promise.reject(getErrors('Ошибка при установке данных подписи: ', err));
        }
        // Задаем настройки для подписи
        try {
            await oSigner.propset_Certificate(cert);
            attrs = await oSigner.AuthenticatedAttributes2;
            await attrs.Add(oAttrs);
            await oSignedData.propset_ContentEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY);
            await oSignedData.propset_Content(dataBase64);
            await oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err));
        }
        try {
            signature = await oSignedData.SignCades(
                oSigner,
                cadesPlugin.CADESCOM_CADES_BES,
                signType,
            );
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось создать подпись: ', err));
        }
        return Promise.resolve(signature);
    }
    return Promise.reject(new Error('Что-то пошло не так'));
};
/**
 * Создает подпись base64 строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataBase64 -- строковые данные в формате base64
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export const signBase64 = async (hash: string, dataBase64: string) => {
    const cert = await getCadesCert(hash);
    if ('CreateObjectAsync' in cadesPlugin) {
        const oSignedData = await cadesPlugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
        const oSigner = await cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner');
        let signature;
        // Задаем настройки для подписи
        try {
            await oSigner.propset_Certificate(cert);
            await oSignedData.propset_ContentEncoding(cadesPlugin.CADESCOM_BASE64_TO_BINARY);
            await oSignedData.propset_Content(dataBase64);
            await oSigner.propset_Options(cadesPlugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err));
        }
        try {
            signature = await oSignedData.SignCades(
                oSigner,
                cadesPlugin.CADESCOM_CADES_BES,
            );
            signature = String(signature).replace(/\s/gm, '');
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось создать подпись: ', err));
        }
        return Promise.resolve(signature);
    }
    return Promise.reject(new Error('Что-то пошло не так'));
};
/**
 * Создает подпись XML строки по `hash` сертификата
 *
 * @param {String} hash -- fingerprint (thumbprint) сертификата
 * @param {String} dataXML -- данные в формате XML
 * @return {Promise} -- обещание, которое зарезолвится с данными о подписи {String}
 * */
export const signDataXML = async (hash: string, dataXML: string) => {
    const cert = await getCadesCert(hash);
    if ('CreateObjectAsync' in cadesPlugin) {
        const oSigner = await cadesPlugin.CreateObjectAsync('CAdESCOM.CPSigner');
        const signerXML = await cadesPlugin.CreateObjectAsync('CAdESCOM.SignedXML');
        let signature;
        // Задаем настройки для подписи
        try {
            await oSigner.propset_Certificate(cert);
            await oSigner.propset_CheckCertificate(true);
            // Добавляем данные для подписи
            await signerXML.propset_Content(dataXML);
            // Устанавливаем тип подписи
            await signerXML.propset_SignatureType(cadesPlugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED);
            // Устанавливаем алгоритм подписи
            await signerXML.propset_SignatureMethod(cadesPlugin.XmlDsigGost3410Url2012256);
            // Устанавливаем алгоритм хэширования
            await signerXML.propset_DigestMethod(cadesPlugin.XmlDsigGost3411Url2012256);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось установить настройки для подписи: ', err));
        }
        try {
            signature = await signerXML.Sign(oSigner);
        } catch (err: any) {
            return Promise.reject(getErrors('Не удалось создать подпись: ', err));
        }
        const oSignedXML2 = await cadesPlugin.CreateObjectAsync('CAdESCOM.SignedXML');
        try {
            await oSignedXML2.Verify(signature);
        } catch (err: any) {
            return Promise.reject(getErrors('Failed to verify signature. Error: ', err));
        }
        return Promise.resolve(signature);
    }
    return Promise.reject(new Error('Что-то пошло не так'));
};
// Возвращает информацию о версии CSP и плагина
export const getSystemInfo = async () => {
    const sysInfo = {...cryptoCommon.getEnvInfo()} as Record<string, any>;
    let e;
    try {
        if ('CreateObjectAsync' in cadesPlugin) {
            e = await cadesPlugin.CreateObjectAsync('CAdESCOM.About');
            const cadesVersion = await e.PluginVersion;
            // Возможен вызов в ранних версиях в виде sysInfo.cspVersion = 'yield' + e.CSPVersion('', 75);
            const cspVersion = await e.CSPVersion();
            if (!cadesVersion) {
                sysInfo.cadesVersion = await e.Version;
            } else {
                sysInfo.cadesVersion = await cadesVersion.toString();
            }
            sysInfo.cspVersion = await cspVersion.toString();
            return Promise.resolve(sysInfo);
        }
        return Promise.reject(new Error('Что-то пошло не так'));
    } catch (err: any) {
        return Promise.reject(getErrors('Ошибка при получении информации о системе: ', err));
    }
};
// Promise обертка для синхронного вызова проверки версии CSP
export const isValidCSPVersion = async (version: string) => {
    return Promise.resolve(cryptoCommon.isValidCSPVersion(version));
};
// Promise обертка для синхронного вызова проверки версии плагина
export const isValidCadesVersion = async (version: string) => {
    return Promise.resolve(cryptoCommon.isValidCadesVersion(version));
};
