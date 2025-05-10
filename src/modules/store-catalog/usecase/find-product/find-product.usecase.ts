import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductRepository from "../../repository/product.repository";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {

    constructor(private productRepository: ProductRepository) {

    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productRepository.find(input.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }
    }
    
}