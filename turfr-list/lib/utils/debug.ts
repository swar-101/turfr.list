/*
* TODO: Future scope:
*  /logging/debug.ts
*  /logging/analytics.ts
*  /logging/error.ts
* */

export const DEBUG = true;

export function debug(label: string, data?: unknown) {
    if (!DEBUG) return;

    console.log(`🔍 ${label}`);
    if (data != undefined) {
        console.log(data);
    }
}

export function debugGroup(label: string, fn: () => void) {
    if (!DEBUG) return;

    console.group(`🔍 ${label}`);
    fn();
    console.groupEnd();
}

export function warn(label: string, data?: unknown) {
    if (!DEBUG) return;
    console.warn(`⚠️ ${label}`, data);
}

export function error(label: string, data?: unknown) {
    console.error(`❌ ${label}`, data);
}