import { Countries } from "@/app/generated/prisma";
import { Option } from "@/interfaces/select-option.interface";

export class CountryMapper {
    static fromCountryToOption(countrie:Countries):Option {
        return {
            id:countrie.id,
            value:countrie.name,
            isSelected: false
        }
    }
}