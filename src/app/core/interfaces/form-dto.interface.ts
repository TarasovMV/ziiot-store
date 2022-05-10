export interface IFormDto {
    type: '1' | '2' | '3',
    description: string;
    formData: {
        value: string;
        description: string;
        name: string;
    }[];
}
