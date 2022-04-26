import {ProductType} from '../enums';

export interface IProductCard {
    id: number;
    name: string;
    description: string;
    providerName: string;
    productType: ProductType;
    document?: string;
    url: string;
    price: string;
    icon: string;
    filters: {
        filterType: number;
        filterId: number;
        name: string | undefined;
    }[];
    sortId?: number;
}
