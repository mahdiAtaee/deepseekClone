export default interface IRepository<T> {
    findOne(ID: number): Promise<T>
    findMany(params: any): Promise<T[]>
    create(params: any): Promise<T>
    updateOne(where: Partial<T>, params: Partial<T>): Promise<boolean>
    updateMany(where: Partial<T>, params: Partial<T>): Promise<boolean>
    deleteOne(ID: string): Promise<boolean>
    deleteMany(where: any): Promise<boolean>
}