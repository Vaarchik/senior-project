import { User } from "./user.interface";

export interface Book {
    id?: number;
    name?: string;
    content?: string;
    rate?: number;
    reviews?: number;
    owner?: User;
}