'use server';

import prisma from "~/lib/prisma";
import { CountryMapper } from "./mappers/CountryMapper";
import { Option } from "@/interfaces/select-option.interface";

export const getCountries = async ():Promise<Option[]> => {
    try {
        const countries = await prisma.countries.findMany();
        return countries.map(country => {
            return CountryMapper.fromCountryToOption(country);
        })
    } catch (error) {
        throw error;
    }
}