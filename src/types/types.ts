

export type CarStockItem = {   
 _id: string,
 mark: string, // Марка
 model: string, // Модель
 engine: Engine,
 drive: string,
 equipmentName: string, // Название комплектации
 price: number, // Стоимость
 createdAt: Date, // Дата создания
}

export type Engine = {
    power: number, // Мощность
    volume: number, // Объем
    transmission: string, // КПП,
    fuel: string, // Топливо
}
