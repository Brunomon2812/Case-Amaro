import { ProductBusiness } from "../../src/business/ProductBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

describe("ProductBusiness.searchProducts", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    test("matches on part of a product name", async () => {
        const response = await productBusiness.searchProducts("vestido")

        expect(response).toEqual([
            { id: "id-mock", name: "Vestido Mock" },
        ])
    })

    test("matches on an exact id", async () => {
        const response = await productBusiness.searchProducts("id-mock2")

        expect(response).toEqual([
            { id: "id-mock2", name: "Blusa Mock" },
        ])
    })

    test("matches on a tag, returning the products carrying it", async () => {
        // "casual" is seeded as a tag on id-mock2 and matches no product name
        const response = await productBusiness.searchProducts("casual")

        expect(response).toEqual([
            { id: "id-mock2", name: "Blusa Mock" },
        ])
    })

    test("returns an empty list when nothing matches", async () => {
        const response = await productBusiness.searchProducts("no-such-product")

        expect(response).toEqual([])
    })

    test("rejects an empty search term", async () => {
        await expect(productBusiness.searchProducts("   "))
            .rejects.toMatchObject({
                statusCode: 400,
                message: "Invalid 'search' parameter: must not be empty",
            })
    })
})
