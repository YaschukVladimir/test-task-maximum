import { store } from "../store";

export type CarStockItem = {
  _id: string,
  mark: string,
  model: string,
  engine: Engine,
  drive: string,
  equipmentName: string,
  price: number,
  createdAt: Date,
}

export type Engine = {
  power: number,
  volume: number,
  transmission: string,
  fuel: string,
}

export type Mark = {
  _id: string;
  count: number;
}

export type Model = {
  _id: string;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export enum NameSpace {
  appSlice = "appSlice",
}
