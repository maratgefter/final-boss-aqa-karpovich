import { generateCustomerData } from "data/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/api.fixture";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [Customers]", () => {
	let token = "";
	let id = "";

	test.beforeAll(async ({ loginApiService }) => {
		token = await loginApiService.loginAsAdmin();
	});

	test.afterEach(async ({ customersApiService }) => {
		if (id) await customersApiService.delete(id, token);
		id = "";
	});

	test("Search by email", async ({ customersApi }) => {
		const customerData = generateCustomerData();
		const createdCustomer = await customersApi.create(customerData, token);

		const response = await customersApi.getWithFilters(token, { search: createdCustomer.body.Customer.email });

		validateResponse(response, {
			status: STATUS_CODES.OK,
			IsSuccess: true,
			ErrorMessage: null,
		});
		const { limit, search, country, total, page, sorting } = response.body;

		expect.soft(limit, `Limit should be ${limit}`).toBe(10);
		expect.soft(search).toBe(createdCustomer.body.Customer.email);
		expect.soft(country).toEqual([]);
		expect.soft(page).toBe(1);
		expect.soft(sorting).toEqual({ sortField: "createdOn", sortOrder: "desc" });
		expect.soft(total).toBeGreaterThanOrEqual(1);
	});
});
