import { Document } from 'mongoose';

export interface Note extends Document {
    readonly name: string;
    readonly description: string;
    readonly favorite: boolean;
    readonly createdAt: Date;
}