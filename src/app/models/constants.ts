export const START_COUNT = 2
export enum COLORS {
    red,
    blue,
    green,
    yellow,
}

export const sleep = async time => {
    return new Promise(resolve => setTimeout(resolve, time));
}