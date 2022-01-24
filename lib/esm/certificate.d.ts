/// <reference types="cadesplugin" />
import { type TagsType } from './common';
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
export default class Certificate {
    getDecodedExtendedKeyUsage: () => Promise<unknown>;
    hasExtendedKeyUsage: (oids: string | string[]) => Promise<unknown>;
    readonly _cert: CAPICOM.CertificateAsync;
    readonly thumbprint: string;
    readonly subjectName: string;
    readonly issuerName: string;
    readonly validFrom: string;
    readonly validTo: string;
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
    /**
     * Разбирает SubjectName сертификата по тэгам
     * @return {Array} - возвращает массив свойств сертификата о владельце
     */
    getOwnerInfo(): Promise<{
        title: string;
        descr: string;
        translated: boolean;
    }[] | null>;
    /**
     * Разбирает IssuerName сертификата по тэгам
     * @return {Array} - возвращает массив свойств сертификата об УЦ
     */
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
export {};
