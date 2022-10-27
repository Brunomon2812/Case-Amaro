import { IProductDB, IProductTagDB, ITagDB, Product } from "../../src/models/Product"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class ProductDatabaseMock extends BaseDatabase {
    public static TABLE_PRODUCTS = "Amaro_Products"
    public static TABLE_TAGS = "Amaro_Tags"
    public static TABLE_TAGS_PRODUCTS = "Amaro_Tags_Products"

    public getProducts = async (): Promise<IProductDB[] | undefined> => {


        const products: IProductDB[] = [
            {
                id: "id-mock",
                name: "Vestido Mock",
            },
            {
                id: "id-mock2",
                name: "Blusa Mock",
            }
        ]


        return products

    }

    public createProduct = async (product: IProductDB): Promise<void> => { }

    public createTag = async (tag: ITagDB): Promise<void> => { }

    public createProductTag = async (productTag: IProductTagDB): Promise<void> => { }

    public findTagByName = async (tag: string): Promise<any[]> => {

        return ["tag mock id"]

    }

    public findProductByIdAndName = async (product: IProductDB): Promise<IProductDB[] | undefined> => {

        const normalProduct: IProductDB[] = [
            {
                id: "id-mock",
                name: "Vestido Mock",
            }]

        return normalProduct

    }

    public findProductByIdOrName = async (search: string): Promise<IProductDB[] | undefined> => {

        const normalProduct: IProductDB[] = [{
            id: "id-mock",
            name: "Vestido Mock",
        }]

        return normalProduct

    }


    public getProductByTagId = async (tagId: string): Promise<IProductDB[] | undefined> => {

        const normalProduct: IProductDB[] = [{
            id: "id-mock",
            name: "Vestido Mock",
        }]

        return normalProduct

    }

}