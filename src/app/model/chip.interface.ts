export interface ChipCompraFormulario{
    address: string;
    name: string;
    phone: number;
    chip: string;
    stripeToken: string;
    price: number;
    descripcion: string;
    id?: string;
    paid?: boolean;
    uid?: string;
    pid?: string;
    date?: string;
    time?: string;
    email?: string;
}
