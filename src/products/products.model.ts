import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
export const ProductSchema = new mongoose.Schema({
title: { type:String, required: true},
description:{type:String, required: true},
price: {type:Number, required: true},
});
//how data should be shown in mongodb

//this interface used to be a class below
//it is converted since Mongoodse works with JS and this class is TS

export interface Product extends Document {
    id: string;
    title: string;
    description: string;
    price: number;

}

// export class Product {

//    constructor(
//        public id: string, 
//        public title: string, 
//        public description: string, 
//        public price: number,
//        ) {

//    }
