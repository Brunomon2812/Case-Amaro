import { NotFoundError } from "../errors/NotFoundError"
import { ConflictError } from "../errors/ConflictError"
import { ParamsError } from "../errors/ParamsError"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { AuthenticationError } from "../errors/AuthenticationError"
import { ProductDatabase } from "../database/ProductDatabase"
import { ICreateProductInputDTO, IProductDB, IProductTagDB, ITagDB, Product } from "../models/Product"

export class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
    ) { }

    public createProduct = async (input: ICreateProductInputDTO) => {
        const { id, name, tags } = input

        if (typeof name !== "string") {
            throw new ParamsError("Parâmetro 'name' inválido: deve ser uma string")
        }

        if (typeof id !== "string") {
            throw new ParamsError("Parâmetro 'id' inválido: deve ser uma string")
        }

        if (name.length < 3) {
            throw new ParamsError("Parâmetro 'name' inválido: mínimo de 3 caracteres")
        }

        const isProductAlreadyExists = await this.productDatabase.findProductByIdAndName(input)

        if (isProductAlreadyExists) {
            throw new ConflictError("Produto já cadastrado")
        }

        const product: IProductDB = {
            id,
            name,
        }

        await this.productDatabase.createProduct(product)


        for (let tag of input.tags) {

            const tagId = await this.productDatabase.findTagByName(tag)
            const newId = this.idGenerator.generate()

            let productTagDB: IProductTagDB = {
                id: this.idGenerator.generate(),
                product_id: product.id,
                tag_id: newId
            }

            if (tagId.length < 1) {
                const tagDB: ITagDB = {
                    id: newId,
                    tag: tag
                }
                await this.productDatabase.createTag(tagDB)
            } else {
                productTagDB.tag_id = tagId[0].id
            }

            await this.productDatabase.createProductTag(productTagDB)

        }

        const response = {
            message: "Produto criado com sucesso!",
        }

        return response
    }


    public getProducts = async (): Promise<IProductDB[]> => {

        const productDB = await this.productDatabase.getProducts()

        if (!productDB) {
            throw new NotFoundError("Nenhum produto cadastrado")
        }

        return productDB
    }


    public searchProducts = async (search: string): Promise<IProductDB[]> => {


        const productDB = await this.productDatabase.findProductByIdOrName(search)

        const tags = await this.productDatabase.findTagByName(search)
        let results = productDB

        if (tags.length > 0) {
            const tagProducts = await this.productDatabase.getProductByTagId(tags[0].id)
            results = [...new Set([...(productDB || []), ...(tagProducts || [])])]
        }

        if (!results) {
            throw new NotFoundError("Nenhum produto cadastrado")
        }

        return results
    }

}