import { Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "pages/salesPortal.page";
import { parseSummaryCell } from "utils/parseCells";
import { CustomerDetailsTitle } from "../common/order.types";
import { logStep } from "utils/report/logStep.utils";

export class OrderDetailsPage extends SalesPortalPage {
	readonly uniqueElement: Locator;

	readonly customerSection: Locator;

	constructor(page: Page) {
		super(page);

		this.customerSection = this.page.locator("#customer-section");
		this.uniqueElement = this.customerSection;
	}

	@logStep("Get customer details")
	async getCustomerDetails() {
		const blocks = this.page.locator("#customer-details .c-details");
		const texts = await blocks.allTextContents();

		return texts.map((text) =>
			parseSummaryCell(
				text,
				(label) => label as CustomerDetailsTitle,
				(value) => value as string,
			),
		);
	}

	@logStep("Open change customer modal")
	async openChangeCustomerModal() {
		await this.page.locator("#edit-customer-pencil").click();
	}
}
