export declare const subjectNameTagsTranslations: {
    possibleNames: string[];
    translation: string;
}[];
export declare const issuerNameTagsTranslations: {
    possibleNames: string[];
    translation: string;
}[];
declare type SubjectNameTagsType = typeof subjectNameTagsTranslations;
declare type IssuerNameTagsType = typeof issuerNameTagsTranslations;
export declare type TagsType = SubjectNameTagsType | IssuerNameTagsType;
export declare const parseCertInfo: (tags: TagsType, infoString: string) => {
    title: string;
    descr: string;
    translated: boolean;
}[] | null;
export declare const getReadableDate: (d: string | Date) => string;
export declare const getDateObj: (dateObj: any) => any;
export declare const getDecodedExtendedKeyUsage: () => Promise<unknown>;
/**
 * Проверка наличия ОИД'а(ОИД'ов) у сертификата
 *
 * @param {String|Array} oids - ОИД'ы для проверки
 * @return {Promise} с отложенным результатом типа {Boolean}
 * */
export declare const hasExtendedKeyUsage: (oids: string | string[]) => Promise<unknown>;
export declare const getEnvInfo: () => {
    browserName: string;
    browserVersion: string;
};
export declare const isValidCSPVersion: (v: string) => boolean;
export declare const isValidCadesVersion: (v: string) => boolean;
export {};
