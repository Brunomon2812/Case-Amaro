import { ProductBusiness } from "../../src/business/ProductBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

describe("ProductBusiness.getProducts", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    test("returns every registered product", async () => {
        const response = await productBusiness.getProducts()

        // The .toEqual() matcher handles non-primitive values such as arrays and objects
        expect(response).toEqual([
            { id: "id-mock", name: "Vestido Mock" },
            { id: "id-mock2", name: "Blusa Mock" },
        ])
    })
})
