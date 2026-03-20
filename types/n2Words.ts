declare module 'n2words' {
    interface N2WordsOptions {
        lang?: string;
    }

    function n2words(num: number, options?: N2WordsOptions): string;

    export default n2words;
    export const en: (num: number) => string;
    export const es: (num: number) => string;
    export const pt: (num: number) => string;
    export const fr: (num: number) => string;
}