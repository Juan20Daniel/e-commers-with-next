export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    // type: ValidTypes;
    gender: Gender
}

export interface CartProduct {
    id: string;
    slug: string;
    price: number;
    title: string;
    inStock: number;
    size: ValidSizes;
    quantity: number;
    image: string;
}

export type Gender = 'men' | 'women' | 'kid' | 'unisex';
export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
