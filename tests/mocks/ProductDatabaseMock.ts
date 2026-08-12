import { IProductDB, IProductTagDB, ITagDB } from "../../src/models/Product"
import { BaseDatabase } from "../../src/database/BaseDatabase"

/**
 * In-memory stand-in for ProductDatabase.
 *
 * The lookups filter the seed data the same way the real Knex queries filter
 * the tables, so the business rules are exercised for real: a product that is
 * not seeded comes back as an empty array, and one that is seeded comes back
 * as a match. Returning a fixed non-empty array regardless of the argument
 * would make every conflict check pass by accident.
 */
export class ProductDatabaseMock extends BaseDatabase {
    public static TABLE_PRODUCTS = "Amaro_Products"
    public static TABLE_TAGS = "Amaro_Tags"
    public static TABLE_TAGS_PRODUCTS = "Amaro_Tags_Products"

    public static PRODUCTS: IProductDB[] = [
        { id: "id-mock", name: "Vestido Mock" },
        { id: "id-mock2", name: "Blusa Mock" },
    ]

    public static TAGS: ITagDB[] = [
        { id: "tag-mock-id", tag: "casual" },
    ]

    public static PRODUCT_TAGS: IProductTagDB[] = [
        { id: "product-tag-mock-id", product_id: "id-mock2", tag_id: "tag-mock-id" },
    ]

    public getProducts = async (): Promise<IProductDB[] | undefined> => {
        return ProductDatabaseMock.PRODUCTS
    }

    public createProduct = async (product: IProductDB): Promise<void> => { }

    public createTag = async (tag: ITagDB): Promise<void> => { }

    public createProductTag = async (productTag: IProductTagDB): Promise<void> => { }

    // The real query selects only the id column.
    public findTagByName = async (tag: string): Promise<any[]> => {
        return ProductDatabaseMock.TAGS
            .filter((seeded) => seeded.tag === tag)
            .map((seeded) => ({ id: seeded.id }))
    }

    public findProductByIdAndName = async (product: IProductDB): Promise<IProductDB[] | undefined> => {
        return ProductDatabaseMock.PRODUCTS.filter(
            (seeded) => seeded.id === product.id || seeded.name === product.name
        )
    }

    public findProductByIdOrName = async (search: string): Promise<IProductDB[] | undefined> => {
        return ProductDatabaseMock.PRODUCTS.filter(
            (seeded) =>
                seeded.id === search ||
                seeded.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    public getProductByTagId = async (tagId: string): Promise<IProductDB[] | undefined> => {
        const productIds = ProductDatabaseMock.PRODUCT_TAGS
            .filter((relation) => relation.tag_id === tagId)
            .map((relation) => relation.product_id)

        return ProductDatabaseMock.PRODUCTS.filter(
            (seeded) => productIds.includes(seeded.id)
        )
    }

}
