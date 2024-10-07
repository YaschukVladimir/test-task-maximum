import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CarStockItem, Mark, Model } from "../types/types";


type QueryParams = {
    mark: string;
    models: Model[];
    page: number;
}


export const stockApi = createApi({
    reducerPath: 'stockApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/'}),
    // baseQuery: fetchBaseQuery({baseUrl: 'https://test-task-maximum-back.vercel.app/api/'}),
    endpoints: (build) => {
        return {
            getCars: build.query<CarStockItem[], QueryParams>({
                query: ({mark, models, page}: QueryParams) => `stock?mark=${mark}&models=${models}&page=${page}`
            }),
            getModels: build.query<Model[], QueryParams>({
                query: ({mark}: QueryParams) => `models/${mark}`
            }),
            getMarks: build.query<Mark[], void>({
                query: () => `marks`
            }),
        }
    }
});

export const {
    useGetCarsQuery,
    useLazyGetCarsQuery,
    useGetMarksQuery,
    useLazyGetMarksQuery,
    useGetModelsQuery,
    useLazyGetModelsQuery,
} = stockApi;