import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../errors/BaseError";
import { ICreateProductInputDTO } from "../models/Product";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) { }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const input: ICreateProductInputDTO = {
                id: req.body.id,
                name: req.body.name,
                tags: req.body.tags
            }

            const response = await this.productBusiness.createProduct(input)
            res.status(201).send(response)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao cadastrar o produto" })
        }
    }

    public getProducts = async (req: Request, res: Response) => {
        try {
            const response = await this.productBusiness.getProducts()
            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar produto" })
        }
    }

    public searchProducts = async (req: Request, res: Response) => {
        try {
            const search = req.query.key as string
            const response = await this.productBusiness.searchProducts(search)
            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar produto" })
        }
    }
}