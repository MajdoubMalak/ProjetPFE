import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { get } from 'http';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}   
    @Post()
    async addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    ){
        //return this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        // ceci va retourner string, qui va etre lu comme html
        //nous voulons recevoir json
        //alors on defini la constante generatedId et 
        // on fait le retour comme suit
    const generatedId= await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
    return {id: generatedId};
    }
    @Get()
   async getAllProducts()
    {
       const result = await this.productService.getAllProducts(); 
      // return result;//nous voulons representer les données à notre facon
      //on va utiliser pour ceci map
      return result.map (prod => ({
          id: prod.id,
          title: prod.title,
          description: prod.description,
          price: prod.price,
      }))
    }
    @Get(':id')
    getProducts(@Param('id') prodId: string,){
        return this.productService.getSingleProduct(prodId);
    }
    @Patch(':id')
   async updateProduct(@Param('id') prodId: string, @Body('title') prodtitle: string, @Body('description') prodDesc: string, @Body('price') prodprice: number){
       await this.productService.updateProduct(prodId, prodtitle,prodDesc,prodprice);
        return null;
    }
    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string){
        await this.productService.deleteProduct(prodId);
        return null;
    }

    

    
}
