declare const _default: {
    StoreLocation: {
        CAPICOM_MEMORY_STORE: number;
        CAPICOM_LOCAL_MACHINE_STORE: number;
        CAPICOM_CURRENT_USER_STORE: number;
        CAPICOM_ACTIVE_DIRECTORY_USER_STORE: number;
        CAPICOM_SMART_CARD_USER_STORE: number;
    };
    StoreOpenMode: {
        CAPICOM_STORE_OPEN_READ_ONLY: number;
        CAPICOM_STORE_OPEN_READ_WRITE: number;
        CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: number;
        CAPICOM_STORE_OPEN_EXISTING_ONLY: number;
        CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED: number;
    };
    CertFindType: {
        CAPICOM_CERTIFICATE_FIND_SHA1_HASH: number;
        CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: number;
        CAPICOM_CERTIFICATE_FIND_ISSUER_NAME: number;
        CAPICOM_CERTIFICATE_FIND_ROOT_NAME: number;
        CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME: number;
        CAPICOM_CERTIFICATE_FIND_EXTENSION: number;
        CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY: number;
        CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY: number;
        CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY: number;
        CAPICOM_CERTIFICATE_FIND_TIME_VALID: number;
        CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID: number;
        CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED: number;
        CAPICOM_CERTIFICATE_FIND_KEY_USAGE: number;
    };
    Time: {
        AUTHENTICATED_ATTRIBUTE_SIGNING_TIME: number;
    };
    Check: {
        CHECK_NONE: number;
        CHECK_TRUSTED_ROOT: number;
        CHECK_TIME_VALIDITY: number;
        CHECK_SIGNATURE_VALIDITY: number;
        CHECK_ONLINE_REVOCATION_STATUS: number;
        CHECK_OFFLINE_REVOCATION_STATUS: number;
        TRUST_IS_NOT_TIME_VALID: number;
        TRUST_IS_NOT_TIME_NESTED: number;
        TRUST_IS_REVOKED: number;
        TRUST_IS_NOT_SIGNATURE_VALID: number;
        TRUST_IS_NOT_VALID_FOR_USAGE: number;
        TRUST_IS_UNTRUSTED_ROOT: number;
        TRUST_REVOCATION_STATUS_UNKNOWN: number;
        TRUST_IS_CYCLIC: number;
        TRUST_IS_PARTIAL_CHAIN: number;
        TRUST_CTL_IS_NOT_TIME_VALID: number;
        TRUST_CTL_IS_NOT_SIGNATURE_VALID: number;
        TRUST_CTL_IS_NOT_VALID_FOR_USAGE: number;
    };
    PropId: {
        CAPICOM_PROPID_UNKNOWN: number;
        CAPICOM_PROPID_KEY_PROV_HANDLE: number;
        CAPICOM_PROPID_KEY_PROV_INFO: number;
        CAPICOM_PROPID_SHA1_HASH: number;
        CAPICOM_PROPID_HASH_PROP: number;
        CAPICOM_PROPID_MD5_HASH: number;
        CAPICOM_PROPID_KEY_CONTEXT: number;
        CAPICOM_PROPID_KEY_SPEC: number;
        CAPICOM_PROPID_IE30_RESERVED: number;
        CAPICOM_PROPID_PUBKEY_HASH_RESERVED: number;
        CAPICOM_PROPID_ENHKEY_USAGE: number;
        CAPICOM_PROPID_CTL_USAGE: number;
        CAPICOM_PROPID_NEXT_UPDATE_LOCATION: number;
        CAPICOM_PROPID_FRIENDLY_NAME: number;
        CAPICOM_PROPID_PVK_FILE: number;
        CAPICOM_PROPID_DESCRIPTION: number;
        CAPICOM_PROPID_ACCESS_STATE: number;
        CAPICOM_PROPID_SIGNATURE_HASH: number;
        CAPICOM_PROPID_SMART_CARD_DATA: number;
        CAPICOM_PROPID_EFS: number;
        CAPICOM_PROPID_FORTEZZA_DATA: number;
        CAPICOM_PROPID_ARCHIVED: number;
        CAPICOM_PROPID_KEY_IDENTIFIER: number;
        CAPICOM_PROPID_AUTO_ENROLL: number;
        CAPICOM_PROPID_PUBKEY_ALG_PARA: number;
        CAPICOM_PROPID_CROSS_CERT_DIST_POINTS: number;
        CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH: number;
        CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH: number;
        CAPICOM_PROPID_ENROLLMENT: number;
        CAPICOM_PROPID_DATE_STAMP: number;
        CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH: number;
        CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH: number;
        CAPICOM_PROPID_EXTENDED_ERROR_INFO: number;
        CAPICOM_PROPID_RENEWAL: number;
        CAPICOM_PROPID_ARCHIVED_KEY_HASH: number;
        CAPICOM_PROPID_FIRST_RESERVED: number;
        CAPICOM_PROPID_LAST_RESERVED: number;
        CAPICOM_PROPID_FIRST_USER: number;
        CAPICOM_PROPID_LAST_USER: number;
    };
    SignatureType: {
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED: number;
        CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING: number;
        CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE: number;
    };
    HashAlgorithm: {
        CADESCOM_HASH_ALGORITHM_CP_GOST_3411: number;
        CADESCOM_HASH_ALGORITHM_MD2: number;
        CADESCOM_HASH_ALGORITHM_MD4: number;
        CADESCOM_HASH_ALGORITHM_MD5: number;
        CADESCOM_HASH_ALGORITHM_SHA_256: number;
        CADESCOM_HASH_ALGORITHM_SHA_384: number;
        CADESCOM_HASH_ALGORITHM_SHA_512: number;
        CADESCOM_HASH_ALGORITHM_SHA1: number;
    };
    CadesType: {
        CADESCOM_CADES_DEFAULT: number;
        CADESCOM_CADES_BES: number;
        CADESCOM_CADES_X_LONG_TYPE_1: number;
    };
    ContentEncoding: {
        CADESCOM_BASE64_TO_BINARY: number;
        CADESCOM_STRING_TO_UCS2LE: number;
    };
    StoreNames: {
        CAPICOM_MY_STORE: string;
    };
    Chain: {
        CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT: number;
        CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN: number;
        CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY: number;
    };
    GostXmlDSigUrls: {
        XmlDsigGost3410Url: string;
        XmlDsigGost3411Url: string;
        XmlDsigGost3410UrlObsolete: string;
        XmlDsigGost3411UrlObsolete: string;
        XmlDsigGost3411Url2012256: string;
        XmlDsigGost3410Url2012256: string;
        XmlDsigGost3411Url2012512: string;
        XmlDsigGost3410Url2012512: string;
    };
};
export default _default;
