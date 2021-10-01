export const START_COUNT = 2
export class Config {
    constructor(
        public muted: boolean = false, 
        public loose: boolean = false, 
        public playing: boolean = false, 
        public is_first_access: boolean = true) { }
}
export enum COLORS {
    red,
    blue,
    green,
    yellow,
}

export const sleep = async time => {
    return new Promise(resolve => setTimeout(resolve, time));
}