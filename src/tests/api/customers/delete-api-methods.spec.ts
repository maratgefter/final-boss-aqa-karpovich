import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { expect, test } from "fixtures/api.fixture";

test.describe("Delete customer", () => {
	let token = "";

	test.beforeAll(async ({ loginApiService }) => {
		token = await loginApiService.loginAsAdmin();
	});

	test.describe("positive", () => {
		test("success", { tag: TAGS.CUSTOMERS }, async ({ customersApiService }) => {
			const customer = await customersApiService.create(token);
			const response = await customersApiService.delete(customer._id, token);

			expect(response.status).toBe(STATUS_CODES.DELETED);
			expect(response.body).toBe("");
		});

		test("customer already deleted", { tag: TAGS.CUSTOMERS }, async ({ customersApi }) => {
			const customer = await customersApi.create(token);
			await customersApi.delete(customer._id, token);

			const response = await customersApi.delete(customer._id, token);
			expect(response.status).toBe(STATUS_CODES.SERVER_ERROR);
		});
	});

	test.describe("negative", () => {
		test("invalid token", { tag: TAGS.CUSTOMERS }, async ({ customersApi }) => {
			const response = await customersApi.delete("whatever", "invalid_token");
			expect(response.status).toBe(STATUS_CODES.UNAUTHORIZED);
		});

		test("invalid id", { tag: TAGS.CUSTOMERS }, async ({ customersApi }) => {
			const response = await customersApi.delete("invalid_id", token);
			expect(response.status).toBe(STATUS_CODES.SERVER_ERROR);
		});
	});
});
