import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';



@Injectable()
export class ProductsService {
   //private products: Product[] = []; 
   constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}
//('Product) est le nom du modele fefini dans le module, ce modele va etre injecté
//dans la variable productModel 
//Model est une classe de Mongoose, et <> contient l'interface // qui etait la classe
//*************************InsertProduct********************************** */
  async  insertProduct(title: string, desc: string, price: number){
      // const prodId = new Date().toString();
      // const newProduct= new Product(new Date().toString(), title, desc, price)
      const newProduct= new this.productModel({
          title: title, description: desc, price: price})
      //curly braces stands for JS type, The schema is defined in Java script
      //there is no need to an id because it is generated automatically
      
      //we are not going to save the new product locally
      // this.products.push(newProduct);
      //we will push it to mongo db with the function save
     const result= await  newProduct.save();
            //return prodId;
            //on va retourner une prommesse; pour ceci
            //on ajoute async et await
            //return result
            console.log(result);
            return result.id as string;
   }
   //*******************Get Products ********************* */
  async getAllProducts() {
      const result= await  this.productModel.find().exec(); //exec to return a real promise
      console.log(result);
       //productModel created for us by Mongoose
       //function find search for data and give a promise
     // return [...this.product];
     return result as Product[]; // ce qui retourne à postman // on ajoute as pour specifier le type de la promesse et puis la fonction dans dans le module doit etre definie async
   }


   //****************GET Single Product*************** */
   async getSingleProduct(id: string){
       const product= await this.findProduct(id);
       if(!product){
        
           throw new NotFoundException('could not find the product');
           
       }
       return product;
   }
  async  updateProduct(id: string, title: string, description: string,  price: number){
       const updatedproduct = await this.findProduct(id);
    // const Index =  this.products.findIndex (prod => prod.id===id);
    // const product = this.products[Index];
    // const updateproduct = {...product}
     if (title){
        updatedproduct.title= title;
     }
     if (description){
       updatedproduct.description=description;
     }
     if (price){
         updatedproduct.price=price;
     }
       updatedproduct.save();
       
    
     // this.products[Index]=updateproduct;
   }
  
  async deleteProduct(id: string){
    //    const Index = this.products.findIndex(prod => prod.id===id);
    //    this.products.splice(Index, 1);
    const result = await this.productModel.deleteOne({_id: id}).exec();
    console.log(result);
    if (result.n===0){
        throw new NotFoundException('Could not be deleted');
    }
   }
            //*****************find a product!************** */
            async findProduct(id: string): Promise<Product> {
                let product;
                try{
                 product = await this.productModel.findById(id);
                } catch (error){
                    throw new NotFoundException('Could not find product');
                }
            //     if(!product){
            //      throw new NotFoundException('could not find the product');
            //  }
             return product;
            
            }

}
