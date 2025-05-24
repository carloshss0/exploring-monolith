export interface AddClientFacadeInputDto {
    id?: string,
    name: string,
    email: string,
    document: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
};

export interface AddClientFacadeOutputDto {
    id: string,
    name: string,
    email: string,
    document: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
}


export interface FindClientFacadeInputDto {
    id: string,
}

export interface FindClientFacadeOutputDto {
    id: string,
    name: string,
    email: string,
    document: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ClientFacadeInterface {
    addClient(input: AddClientFacadeInputDto): Promise<void>;
    findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}