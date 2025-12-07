import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/products/generateProductData";
import { createProductSchema } from "data/schemas/product/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { ERROR_MESSAGES } from "data/notifications";
import { errorSchema } from "data/schemas/core.schema";

test.describe("[API] [Sales Portal] [Products]", () => {
	let id = "";
	let token = "";

	test.afterEach(async ({ productsApiService }) => {
		await productsApiService.delete(token, id);
	});

	test("Update product with valid data", async ({ loginApiService, productsApiService, productsApi }) => {
		//TODO: Preconditions
		token = await loginApiService.loginAsAdmin();
		const createdProduct = await productsApiService.create(token);
		id = createdProduct._id;

		//TODO: Action
		const updatedProductData = generateProductData();
		const updatedProductResponse = await productsApi.update(id, updatedProductData, token);

		//TODO: Assert
		validateResponse(updatedProductResponse, {
			status: STATUS_CODES.OK,
			schema: createProductSchema,
			IsSuccess: true,
			ErrorMessage: null,
		});

		const updatedProduct = updatedProductResponse.body.Product;
		expect(_.omit(updatedProduct, ["_id", "createdOn"])).toEqual(updatedProductData);
		expect(id).toBe(updatedProduct._id);
	});

	test("[negative] Update product without token", async ({ loginApiService, productsApiService, productsApi }) => {
		//TODO: Preconditions
		token = await loginApiService.loginAsAdmin();
		const createdProduct = await productsApiService.create(token);
		id = createdProduct._id;

		//TODO: Action
		const updatedProductData = generateProductData();
		const updatedProductResponse = await productsApi.update(id, updatedProductData, "");
		console.log("updatedProductResponse", updatedProductResponse);

		//TODO: Assert
		validateResponse(updatedProductResponse, {
			status: STATUS_CODES.UNAUTHORIZED,
			schema: errorSchema,
			IsSuccess: false,
			ErrorMessage: ERROR_MESSAGES.UNAUTHORIZED,
		});
	});
});
