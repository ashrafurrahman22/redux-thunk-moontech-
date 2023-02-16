import { TOGGLE_BRAND, TOGGLE_STOCK } from "../actionTypes/actionTypes"

export const toogleBrand = (brandName) => {
    return {
        type: TOGGLE_BRAND,
        payload: brandName,
    }
}

export const toogleStock = () => {
    return {
        type: TOGGLE_STOCK,
    }
}