import { ICustomer } from "data/types/customer.types";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { TAGS } from "data/tags";

export const invalidDataTypeForApi = [
	{
		title: "customer with invalid email data type",
		testCustomerData: { ...generateCustomerData(), email: 52342342 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid name data type",
		testCustomerData: { ...generateCustomerData(), name: 123123123 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid country data type",
		testCustomerData: { ...generateCustomerData(), country: 890890890 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid city data type",
		testCustomerData: { ...generateCustomerData(), city: 123132 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid street data type",
		testCustomerData: { ...generateCustomerData(), street: 123132 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid house data type",
		testCustomerData: { ...generateCustomerData(), house: "house" } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid flat data type",
		testCustomerData: { ...generateCustomerData(), flat: "flat" } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid phone data type",
		testCustomerData: { ...generateCustomerData(), phone: 6787678786876 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
	{
		title: "customer with invalid notes data type",
		testCustomerData: { ...generateCustomerData(), notes: 123345567 } as unknown as ICustomer,
		tags: [TAGS.API, TAGS.REGRESSION],
	},
];
