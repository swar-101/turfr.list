// export type IdentityState = {
//     deviceId: string | null;
//     name: string | null;
// };
//
// export type Identity = {
//     deviceId: string;
//     name: string;
// };
//
// export function toIdentity(state: IdentityState): Identity | null {
//     if (!state.deviceId || !state.name) return null;
//
//     return {
//         deviceId: state.deviceId,
//         name: state.name,
//     };
// }