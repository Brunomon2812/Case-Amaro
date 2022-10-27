import { ProductBusiness } from "../../src/business/ProductBusiness"
import { ICreateProductInputDTO, IProductDB } from "../../src/models/Product"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

describe("Testando o método do ProductBusiness", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    test("getProducts bem sucedido", async () => {
        const response = await productBusiness.getProducts()
        // O matcher .toEqual() lida com valores não-primitivos Arrays e objetos
        expect(response).toEqual([
            {
                "id": "8104",
                "name": "VESTIDO BABADO TURTLENECK",
                "tags": []
            },
            {
                "id": "8109",
                "name": "VESTIDO BABADOS HORIZONTAIS",
                "tags": []
            },
            {
                "id": "8119",
                "name": "VESTIDO BABADOS KNIT",
                "tags": []
            },
            {
                "id": "7518",
                "name": "VESTIDO CAMISETA FANCY",
                "tags": []
            },
            {
                "id": "7533",
                "name": "VESTIDO COTTON DOUBLE",
                "tags": []
            },
            {
                "id": "8363",
                "name": "VESTIDO CURTO MANGA LONGA LUREX",
                "tags": [
                    "colorido",
                    "metal",
                    "delicado",
                    "estampas",
                    "passeio"
                ]
            },
            {
                "id": "8310",
                "name": "VESTIDO CURTO PONTO ROMA MANGA",
                "tags": [
                    "casual",
                    "metal",
                    "delicado",
                    "descolado",
                    "elastano",
                    "estampas"
                ]
            },
            {
                "id": "8080",
                "name": "VESTIDO CURTO RENDA VISCOSE",
                "tags": []
            },
            {
                "id": "8264",
                "name": "VESTIDO CURTO VELUDO CRISTAL",
                "tags": []
            },
            {
                "id": "8293",
                "name": "VESTIDO CURTO VELUDO RECORTE GOLA",
                "tags": []
            }
        ])


})
})