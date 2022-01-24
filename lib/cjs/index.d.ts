import * as cryptoService from './api';
export { default as Certificate } from './certificate';
declare type TServices = typeof cryptoService;
declare type TMethod = keyof TServices;
declare type TService<T extends TMethod> = TServices[T];
export declare const call: <T extends "isValidEDSSettings" | "getCertsList" | "getCert" | "xmlSignCreate" | "signData" | "signBase64" | "signDataXML" | "getSystemInfo" | "isValidCSPVersion" | "isValidCadesVersion", P extends Parameters<TService<T>>>(methodName: T, ...args: P) => Promise<Awaited<ReturnType<TService<T>>>>;
