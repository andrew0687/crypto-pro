/* eslint-disable new-cap */
import oids from './oids';
// const cadesplugin = window.cadesplugin;
const checkBrowser = () => {
    const ua = navigator.userAgent;
    let tem;
    let M = ua.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edg|YaBrowser)\/(\d+)/);
        if (tem != null) {
            return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {name: M[0], version: M[1]};
};
export const subjectNameTagsTranslations = [
    {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
    {possibleNames: ['CN'], translation: 'Владелец'},
    {possibleNames: ['SN'], translation: 'Фамилия'},
    {possibleNames: ['G'], translation: 'Имя Отчество'},
    {possibleNames: ['C'], translation: 'Страна'},
    {possibleNames: ['S'], translation: 'Регион'},
    {possibleNames: ['STREET'], translation: 'Адрес'},
    {possibleNames: ['O'], translation: 'Компания'},
    {possibleNames: ['OU'], translation: 'Отдел/подразделение'},
    {possibleNames: ['T'], translation: 'Должность'},
    {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
    {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
    {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
    {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
    {possibleNames: ['E'], translation: 'Email'},
    {possibleNames: ['L'], translation: 'Город'},
];
export const issuerNameTagsTranslations = [
    {possibleNames: ['UnstructuredName'], translation: 'Неструктурированное имя'},
    {possibleNames: ['CN'], translation: 'Удостоверяющий центр'},
    {possibleNames: ['S'], translation: 'Регион'},
    {possibleNames: ['C'], translation: 'Страна'},
    {possibleNames: ['STREET'], translation: 'Адрес'},
    {possibleNames: ['O'], translation: 'Компания'},
    {possibleNames: ['OU'], translation: 'Тип'},
    {possibleNames: ['T'], translation: 'Должность'},
    {possibleNames: ['ОГРН', 'OGRN'], translation: 'ОГРН'},
    {possibleNames: ['ОГРНИП', 'OGRNIP'], translation: 'ОГРНИП'},
    {possibleNames: ['СНИЛС', 'SNILS'], translation: 'СНИЛС'},
    {possibleNames: ['ИНН', 'INN'], translation: 'ИНН'},
    {possibleNames: ['E'], translation: 'Email'},
    {possibleNames: ['L'], translation: 'Город'},
];
type SubjectNameTagsType = typeof subjectNameTagsTranslations;
type IssuerNameTagsType = typeof issuerNameTagsTranslations;
export type TagsType = SubjectNameTagsType | IssuerNameTagsType;
/*function generateAsyncFn(cb) {
    const canAsync = cadesplugin.CreateObjectAsync;
    const dynamicScriptName = cb.name || 'asyncFn';
    cb = String(cb);
    let args = cb.match(/^function[\s\w]*?\((.*?)\)/);
    args = (args && args[1]) || '';
    cb = cb.replace(/^.*?{([\s\S]*?)}$/, '$1');
    function GeneratorFunction() {
        return (new Function('', 'return Object.getPrototypeOf(function*(){}).constructor'))();
    }
    cb = String(new (canAsync ? GeneratorFunction() : Function)(args, cb));
    cb = cb.replace(/cryptoCommon\.createObj(\([\s\S]*?\))/gm, 'cadesplugin.CreateObject' + (canAsync ? 'Async' : '') + '$1');
    cb = cb.replace(/("|')(yield)(\1)\s*?\+\s*?\b/gm, canAsync ? '$2 ' : '');
    if (!canAsync) {
        cb = cb.replace(/propset_(.*?)\((.*?)\)/gm, '$1 = $2');
    }
    return (canAsync ?
        'cadesplugin.async_spawn(' + cb + ');'
        : '(' + cb + ')();') + '//# sourceURL=evaled-' + dynamicScriptName + '.js';
}*/
// Парсит информацию из строки с информацией о сертификате
export const parseCertInfo = (tags: TagsType, infoString: string) => {
    /**
     * Пример входной строки:
     *
     T=Генеральный директор, UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",
     STREET="Крыленко, д.3, лит.Б", CN=Король Анатолий Евгеньевич, G=Анатолий Евгеньевич, SN=Король,
     OU=Администрация, O="ООО ""Аксиома""", L=Санкт-Петербург, S=78 г. Санкт-Петербург, C=RU, E=korol@sferasro.ru,
     INN=007811514257, OGRN=1127847087884, SNILS=11617693460
     * */
    const result = infoString.match(/([а-яА-Яa-zA-Z0-9.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
    if (result) {
        return result.map((group) => {
            /**
             * Пример входной строки:
             *
             UnstructuredName="INN=7811514257/KPP=781101001/OGRN=1127847087884",
             * */
            const parts = group.match(/^([а-яА-Яa-zA-Z0-9.]+)=(.+?),?$/);
            let title = parts ? parts[1] : '';
            let descr = parts ? parts[2] : '';
            let translated = false;
            let oidTitle;
            // Если тайтл содержит ОИД, пытаемся расшифровать
            if (/^OID./.test(title)) {
                oidTitle = title.match(/^OID\.(.*)/);
                if (oidTitle && oidTitle[1]) {
                    oidTitle = oids[oidTitle[1] as keyof typeof oids];
                    if (oidTitle) {
                        title = oidTitle;
                    }
                }
            }
            // Вырезаем лишние кавычки
            descr = descr.replace(/^"(.*)"/, '$1');
            descr = descr.replace(/"{2}/g, '"');
            tags.some((tag) => {
                return tag.possibleNames.some((possible) => {
                    const match = possible === title;
                    if (match) {
                        title = tag.translation;
                        translated = true;
                    }
                    return match;
                });
            });
            return {
                title: title,
                descr: descr,
                translated: translated,
            };
        });
    }
    return result;
};
// Возвращает дату в формате (dd.mm.yyyy hh:mm:ss) из строки, формата, используемого плагином cryptoPro
export const getReadableDate = (d: string | Date) => {
    const date = new Date(d);
    return ([
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ].join('.') + ' ' + [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ].join(':')).replace(/\b(\d)\b/g, '0$1');
};
// Преобразует дату для IE
export const getDateObj = (dateObj: any) => {
    return checkBrowser().name === 'IE' ? dateObj.getVarDate() : dateObj;
};
// Подготавливает информацию о сертификатах
/*export const prepareCertsInfo = (items: CertificateType[]) => {
    return items.map((c) => {
        const name = c.subjectName.match(/CN=(.+?)(?:,|$)/);
        const sn = c.subjectName.match(/SN=(.+?)(?:,|$)/);
        const g = c.subjectName.match(/G=(.+?)(?:,|$)/);
        const o = c.subjectName.match(/O=(.+?)(?:,|$)/);
        // Удалось ли вытащить Common Name
        if (name && name[1]) {
            c.name = name[1];
        }
        if (sn && g) {
            c.name = sn[1] + ' ' + g[1];
        }
        c.organization = c.name;
        if (o) {
            c.organization = o[1];
        }
        c.validFrom = getReadableDate(c.validFrom);
        c.validTo = getReadableDate(c.validTo);
        c.label = c.name + ' (до ' + c.validTo + ')';
        return c;
    });
};*/
// Возвращает расшифрованные ОИД'ы
export const getDecodedExtendedKeyUsage = () => {
    const that = this; // eslint-disable-line
    return new Promise((resolve) => {
        // @ts-ignore
        that.getExtendedKeyUsage().then((certOids: string[]) => {
            resolve(certOids.reduce((oidsLst, id) => {
                const descr = oids[id as keyof typeof oids] || null;
                const oid = {
                    id,
                    descr,
                };
                if (descr) {
                    return [oid, ...oidsLst];
                } else {
                    return [...oidsLst, oid];
                }
            }, [] as any[]));
        });
    });
};
/**
 * Проверка наличия ОИД'а(ОИД'ов) у сертификата
 *
 * @param {String|Array} oids - ОИД'ы для проверки
 * @return {Promise} с отложенным результатом типа {Boolean}
 * */
export const hasExtendedKeyUsage = (oids: string | string[]) => {
    const that = this; // eslint-disable-line
    return new Promise((resolve) => {
        // @ts-ignore
        that.getExtendedKeyUsage().then((certOids: string[]) => {
            let result;
            if (Array.isArray(oids)) {
                result = oids.every((oidToCheck) => {
                    return certOids.some((certOid) => {
                        return certOid === oidToCheck;
                    });
                });
            } else {
                result = certOids.some((certOid) => certOid === oids);
            }
            resolve(result);
        });
    });
};
// Выводит информацию о системе пользователя
export const getEnvInfo = () => {
    const parsed = checkBrowser();
    return {
        browserName: parsed.name,
        browserVersion: parsed.version,
    };
    /*if (parsed.mac) {
        info.os = 'Mac';
    } else if (parsed.windows) {
        info.os = 'Windows';
    } else if (parsed.linux) {
        info.os = 'Linux';
    }*/
};
// Подходящая ли версия CSP
export const isValidCSPVersion = (v: string): boolean => {
    const version = v.match(/\d+?\b(?:\.\d+)?/);
    return version ? Number(version[1]) >= 3.6 : false;
};
// Подходящая ли версия cades плагина
export const isValidCadesVersion = (v: string) => {
    const version = v.split('.').reduce((verInfo, number, i) => {
        if (i === 0) {
            verInfo.major = Number(number);
        } else if (i === 1) {
            verInfo.minor = Number(number);
        } else if (i === 2) {
            verInfo.patch = Number(number);
        }
        return verInfo;
    }, {} as Record<string, number>);
    if (version.major < 2) {
        return false;
    }
    return version.patch >= 12438;
};
