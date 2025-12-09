import { IApiClient, IRequestOptions } from "api/core/types";
import { apiConfig } from "config/apiConfig";
import { IOrderResponse, IOrder } from "data/types/order.types";

export class OrdersApi {
	constructor(private apiClient: IApiClient) {}

	async create(order: IOrder, token: string) {
		const options: IRequestOptions = {
			baseURL: apiConfig.baseUrl!,
			url: apiConfig.endpoints.orders,
			method: "post",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			data: order,
		};

		return await this.apiClient.send<IOrderResponse>(options);
	}
}
