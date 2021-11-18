import * as cryptoService from './api';
declare type ServicesType = typeof cryptoService;
declare type MethodType = keyof ServicesType;
declare type ServiceType<T extends MethodType> = ServicesType[T];
export declare const call: <T extends "isValidEDSSettings" | "getCertsList" | "getCert" | "xmlSignCreate" | "signData" | "signBase64" | "signDataXML" | "getSystemInfo" | "isValidCSPVersion" | "isValidCadesVersion", P extends Parameters<ServiceType<T>>>(methodName: T, ...args: P) => Promise<Awaited<ReturnType<ServiceType<T>>>>;
export {};
