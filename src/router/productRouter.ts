import { Router } from 'express'
import { ProductBusiness } from '../business/ProductBusiness'
import { ProductController } from '../controller/ProductController'
import { ProductDatabase } from '../database/ProductDatabase'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const productRouter = Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDatabase(),
        new IdGenerator(),
        new HashManager(),
     
    )
)

productRouter.post("/", productController.createProduct)
productRouter.get("/", productController.getProducts)
productRouter.get("/search", productController.searchProducts)