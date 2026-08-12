import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateProductInputDTO } from "../../src/models/Product"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

// Groups related tests into a suite.
// The first argument describes the group.
// The second argument is a callback holding the tests, usually an arrow function.
describe("ProductBusiness.createProduct", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    // Each test lives inside the describe callback.
    // The first argument describes the test, the second is a callback that may be async.
    // expect() is the assertion Jest evaluates.
    test("creates a product successfully", async () => {
        let input: ICreateProductInputDTO = {
            id: "8314",
            name: "VESTIDO PLISSADO ACINTURADO",
            tags: ["casual", "viagem", "delicado"]
        }
        const response = await productBusiness.createProduct(input)
        expect(response.message).toEqual(`Product created successfully!`)
    })


    test("returns an error when the product is not registered", async () => {
        try {
            let input: ICreateProductInputDTO = {
                id: "8314",
                name: "VESTIDO PLISSADO ACINTURADO",
                tags: ["casual", "viagem", "delicado"]
            }
            await productBusiness.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual(`Not authenticated`)

            }
        }

    })


    test("returns an error when the product is not registered", async () => {
        try {
            let input: ICreateProductInputDTO = {
                id: "",
                name: "VESTIDO PLISSADO ACINTURADO",
                tags: ["casual", "viagem", "delicado"]
            }
            await productBusiness.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual(`Product already registered`)

            }
        }

    })

    test("returns an error when the product already exists", async () => {
        try {
            let input: ICreateProductInputDTO = {
                id: "8314",
                name: "VESTIDO PLISSADO ACINTURADO",
                tags: ["casual", "viagem", "delicado"]
            }
            await productBusiness.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(409)
                expect(error.message).toEqual(`Product already registered`)

            }
        }
    })


    test("returns an error when name is not a string", async () => {
        try {
            const input = {
                id: `8314`,
                name: 12345,
                tags: [`casual", "viagem", "delicado`]
            } as unknown as ICreateProductInputDTO

            await productBusiness.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual(`Invalid 'name' parameter: must be a string`)
            }
        }
    })

    test("returns an error when name is shorter than 3 characters", async () => {
        try {
            const input = {
                id: `8314`,
                name: "Br",
                tags: [`casual", "viagem", "delicado`]
            } as unknown as ICreateProductInputDTO

            await productBusiness.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toEqual(400)
                expect(error.message).toEqual(`Invalid 'name' parameter: must be at least 3 characters long`)
            }
        }

    })
})