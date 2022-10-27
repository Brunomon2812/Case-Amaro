import { ProductBusiness } from "../../src/business/ProductBusiness"
import { BaseError } from "../../src/errors/BaseError"
import { ICreateProductInputDTO } from "../../src/models/Product"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductDatabaseMock } from "../mocks/ProductDatabaseMock"

// Agrupa os testes para dar semântica (suíte/grupo de testes)
// O primeiro argumento é uma string de descricao do grupo.
// O segundo argumento é um callback com seu conteudo. Normalmente é uma funcao anonima arrow function
describe("Testando o método do ProductBusiness", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
    )

    // Vem dentro do callback do describe e guarda um teste unico
    // O primeiro argumento é uma string de descricao do teste
    // O segundo argumento é um callback que pode ser assincrono
    // expect() é a assertiva, uma afirmacao que o Jest ira avaliar
    test("createProduct bem sucedido", async () => {
        let input: ICreateProductInputDTO = {
            id: "8314",
            name: "VESTIDO PLISSADO ACINTURADO",
            tags: ["casual", "viagem", "delicado"]
        }
        const response = await productBusiness.createProduct(input)
        expect(response.message).toEqual(`Produto criado com sucesso!`)
    })


    test("Retorna um erro caso o produto nao esteja cadastrado", async () => {
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
                expect(error.message).toEqual(`Nao autenticado`)

            }
        }

    })


    test("Retorna um erro caso o produto nao esteja cadastrado", async () => {
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
                expect(error.message).toEqual(`Produto já cadastrado`)

            }
        }

    })

    test("Retorna um erro caso o produto ja exista", async () => {
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
                expect(error.message).toEqual(`Produto já cadastrado`)

            }
        }
    })


    test("Retorna um erro caso o name nao seja uma string", async () => {
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
                expect(error.message).toEqual(`Parâmetro 'name' inválido: deve ser uma string`)
            }
        }
    })

    test("Retorna erro caso o name tenha menos que 3 caracteres", async () => {
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
                expect(error.message).toEqual(`Parâmetro 'name' inválido: mínimo de 3 caracteres`)
            }
        }

    })
})