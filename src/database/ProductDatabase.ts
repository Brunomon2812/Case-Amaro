import { IProductDB, IProductTagDB, ITagDB, Product } from "../models/Product"
import { BaseDatabase } from "./BaseDatabase"

export class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "Amaro_Products"
    public static TABLE_TAGS = "Amaro_Tags"
    public static TABLE_TAGS_PRODUCTS = "Amaro_Tags_Products"

    public getProducts = async (): Promise<IProductDB[] | undefined> => {

        const result: IProductDB[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select()

        return result
    }

    public createProduct = async (product: IProductDB): Promise<void> => {
      

        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(product)

    }

    public createTag = async (tag: ITagDB): Promise<void> => {
    

        await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .insert(tag)

    }

    public createProductTag = async (productTag: IProductTagDB): Promise<void> => {


        await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS_PRODUCTS)
            .insert(productTag)

    }

    public findTagByName = async (tag: string): Promise<any[]> => {


        const id = await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .select("id")
            .where("tag", tag)

        return id

    }

    public findProductByIdAndName = async (product: IProductDB): Promise<IProductDB[] | undefined> => {

        const result = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select()
            .where("id", product.id)
            .orWhere("name", product.name)

        return result

    }

    public findProductByIdOrName = async (search: string): Promise<IProductDB[] | undefined> => {

        const result: IProductDB[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select()
            .where("id", search)
            .orWhereILike("name", "%" + search + "%")
        return result

    }


    public getProductByTagId = async (tagId: string): Promise<IProductDB[] | undefined> => {

        const result = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select(ProductDatabase.TABLE_PRODUCTS+".id", ProductDatabase.TABLE_PRODUCTS+".name")
            .join(ProductDatabase.TABLE_TAGS_PRODUCTS, ProductDatabase.TABLE_PRODUCTS+".id", "=", ProductDatabase.TABLE_TAGS_PRODUCTS + ".product_id")
            .where(ProductDatabase.TABLE_TAGS_PRODUCTS + ".tag_id", tagId)

        return result

    }

}