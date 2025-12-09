import { STATUS_CODES } from "data/statusCodes";
import { SortOrder } from "data/types/core.types";
import { IProductFromResponse, ProductsSortField } from "data/types/product.types";

interface IProductsSearch {
	title: string;
	sortField: ProductsSortField;
	successMessage: string | null;
	statusCode: STATUS_CODES;
}

interface IProductsSorted {
	title: string;
	sortField: ProductsSortField;
	sortOrder: SortOrder;
	successMessage: string | null;
	statusCode: STATUS_CODES;
}

export const searchForProduct: IProductsSearch[] = [
	{
		sortField: "name",
		title: "Search by name",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
	{
		sortField: "manufacturer",
		title: "Search by price",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
	{
		sortField: "price",
		title: "Search by manufacturer",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
];

export const sortedForProductAsc: IProductsSorted[] = [
	{
		sortField: "createdOn",
		sortOrder: "asc",
		title: "SortField: createdOn, sortOrder: asc",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
	{
		sortField: "manufacturer",
		sortOrder: "asc",
		title: "SortField: manufacturer, sortOrder: asc",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
	{
		sortField: "price",
		sortOrder: "asc",
		title: "SortField: price, sortOrder: asc",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
	{
		sortField: "name",
		sortOrder: "asc",
		title: "SortField: name, sortOrder: asc",
		successMessage: null,
		statusCode: STATUS_CODES.OK,
	},
];

export const sortFunctions: Record<
	ProductsSortField,
	(a: IProductFromResponse, b: IProductFromResponse, sortOrder: SortOrder) => number
> = {
	createdOn: (a, b, sortOrder) => {
		const dateA = new Date(a.createdOn).getTime();
		const dateB = new Date(b.createdOn).getTime();
		return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
	},
	manufacturer: (a, b, sortOrder) => {
		const compare = a.manufacturer.localeCompare(b.manufacturer);
		const dateA = new Date(a.createdOn).getTime();
		const dateB = new Date(b.createdOn).getTime();
		return sortOrder === "asc" ? compare || dateA - dateB : -compare || dateB - dateA;
	},
	price: (a, b, sortOrder) => {
		const dateA = new Date(a.createdOn).getTime();
		const dateB = new Date(b.createdOn).getTime();
		return sortOrder === "asc" ? a.price - b.price || dateA - dateB : b.price - a.price || dateB - dateA;
	},
	name: (a, b, sortOrder) => {
		const compare = a.name.localeCompare(b.name);
		const dateA = new Date(a.createdOn).getTime();
		const dateB = new Date(b.createdOn).getTime();
		return sortOrder === "asc" ? compare || dateA - dateB : -compare || dateB - dateA;
	},
};
