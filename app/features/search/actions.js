import { CHANGE_TEXT,PRODUCT_RESPONSE_FAILED,PRODUCT_RESPONSE_OK } from "./types";


export function connexionOn(text) {
    return {
        type: CHANGE_TEXT,
        payload:{text:text}

        };
}

export function responseProductOk(data) {
    return {
        type: PRODUCT_RESPONSE_OK,
        payload:{data:data}

        };
}

export function responseFailed() {
    return {
        type: PRODUCT_RESPONSE_FAILED,
        };
}