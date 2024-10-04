import { CarStockItem } from "../types/types";

export type CarMark = {
    [key: string]: string[];
}

export function filterDataByMarks(data: CarStockItem[]): CarMark {
    const carMarkObj: CarMark = {};

    data.forEach((car) => {
        if (carMarkObj[car.mark]) {
            carMarkObj[car.mark].push(car.mark)
        }
        
    })

    return carMarkObj;
}