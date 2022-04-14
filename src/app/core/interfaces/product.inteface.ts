export interface IProduct {
    id: number;
    name: string;
    description: string;
    functions: string;
    interlinear: string;
    effects: string;
    principles: string;
    industries: string;
    reference: string;
    icon: string;
    gallery: string[];
    files: {
        id: number;
        productId: number;
        path: string;
        fileType: number
    }[];
    filters: {
        filterId: number;
        filterType: number;
        name?: string;
    }[];
    server: string;
    client: string;
    languages: string;
    providerId: number;
    provider: {
        id: number;
        name: string;
        phoneNumber: string;
        fullName: string;
        email: string;
        website: string
    };
    url: string;
    price: string;
    priceMounth: string;
    discount: string;
    document: string;
    showProviderInCard: number
}
