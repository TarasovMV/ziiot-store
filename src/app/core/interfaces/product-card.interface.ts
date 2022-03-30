export interface IProductCard {
    id: number;
    name: string;
    description: string;
    providerName: string;
    url: string;
    price: string;
    icon: string;
    filters: {
        filterType: number;
        filterId: number;
        name: string | undefined;
    }[];
}
