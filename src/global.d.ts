export {};

declare global {
    interface Window {
        __POWERED_BY_QIANKUN__: string;
        __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
    }
    let __webpack_public_path__: string;
}