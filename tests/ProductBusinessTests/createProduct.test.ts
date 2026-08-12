import { ProductBusiness } from "../../src/business/ProductBusiness"
import { ICreateProductInputDTO } from "../../src/models/Product"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

describe("ProductBusiness.createProduct", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    test("creates a product that is not registered yet", async () => {
        const input: ICreateProductInputDTO = {
            id: "8314",
            name: "VESTIDO PLISSADO ACINTURADO",
            tags: ["casual", "viagem", "delicado"]
        }

        const response = await productBusiness.createProduct(input)

        expect(response.message).toEqual("Product created successfully!")
    })

    test("rejects a product whose id is already registered", async () => {
        const input: ICreateProductInputDTO = {
            id: "id-mock",
            name: "VESTIDO PLISSADO ACINTURADO",
            tags: ["casual"]
        }

        await expect(productBusiness.createProduct(input))
            .rejects.toMatchObject({
                statusCode: 409,
                message: "Product already registered",
            })
    })

    test("rejects a product whose name is already registered", async () => {
        const input: ICreateProductInputDTO = {
            id: "8314",
            name: "Vestido Mock",
            tags: ["casual"]
        }

        await expect(productBusiness.createProduct(input))
            .rejects.toMatchObject({
                statusCode: 409,
                message: "Product already registered",
            })
    })

    test("rejects a name that is not a string", async () => {
        const input = {
            id: "8314",
            name: 12345,
            tags: ["casual"]
        } as unknown as ICreateProductInputDTO

        await expect(productBusiness.createProduct(input))
            .rejects.toMatchObject({
                statusCode: 400,
                message: "Invalid 'name' parameter: must be a string",
            })
    })

    test("rejects an id that is not a string", async () => {
        const input = {
            id: 8314,
            name: "VESTIDO PLISSADO ACINTURADO",
            tags: ["casual"]
        } as unknown as ICreateProductInputDTO

        await expect(productBusiness.createProduct(input))
            .rejects.toMatchObject({
                statusCode: 400,
                message: "Invalid 'id' parameter: must be a string",
            })
    })

    test("rejects a name shorter than 3 characters", async () => {
        const input: ICreateProductInputDTO = {
            id: "8314",
            name: "Br",
            tags: ["casual"]
        }

        await expect(productBusiness.createProduct(input))
            .rejects.toMatchObject({
                statusCode: 400,
                message: "Invalid 'name' parameter: must be at least 3 characters long",
            })
    })
})
