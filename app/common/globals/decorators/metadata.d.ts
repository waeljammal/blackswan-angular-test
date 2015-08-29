declare module 'op/metadata' {
    export function inject(...keys);
    export function controller(...values:string[]):any;
    export function log():void;
    export function directive(...values:string[]):any;
    export function service(...values:string[]):any;
    export function autobind():void;
}