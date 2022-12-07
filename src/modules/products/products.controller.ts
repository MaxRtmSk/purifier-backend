import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiCookieAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { FindOneParams } from "src/utils/findOneParams";
import { GetProductsByCategoryQuery } from "./dto/getProductsByCategoryQuery";
import { GetProductsByPriceQuery } from "./dto/getProductsByPriceQuery";
import { ProductDto } from "./dto/product.dto";
import { ProductsService } from "./products.service";
import { SearchProductsQuery } from "./dto/searchProductsQuery";
import { LoadMorePagination } from "./dto/loadMorePaginationQuery";

@ApiTags('Products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiQuery({ name: 'subCategoryIds', required: false, type: 'string', example: '1,2,3', explode: false })
    getProducts(
        @Query() { categoryId }: GetProductsByCategoryQuery,
        @Query('subCategoryIds', new ParseArrayPipe({ items: Number, separator: ',', optional: true })) subCategoryIds: number[],
        @Query() { priceMin, priceMax }: GetProductsByPriceQuery,
        @Query() { search }: SearchProductsQuery,
        @Query() { next }: LoadMorePagination,
        @Query() { orderBy, sort }: any,
    ) {
        return this.productsService.getProducts(
            categoryId,
            subCategoryIds,
            priceMin,
            priceMax,
            orderBy,
            sort,
            next,
            search,
        );
    }

    @Get(':id')
    getProductById(@Param() { id }: FindOneParams) {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    updateProduct(@Param() { id }: FindOneParams, @Body() productData: ProductDto) {
        return this.productsService.updateProduct(id, productData);
    }

    @Post()
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    createProduct(@Body() productData: ProductDto) {
        return this.productsService.createProduct(productData);
    }

    @Delete(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    deleteProduct(@Param() { id }: FindOneParams) {
        return this.productsService.deleteProduct(id);
    }
}