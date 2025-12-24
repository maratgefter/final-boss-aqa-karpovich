import { Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "pages/salesPortal.page";
import { parseSummaryCell } from "utils/parseCells";
import { ProductDetailsTitle } from "../common/order.types";
import { logStep } from "utils/report/logStep.utils";

export class OrderDetailsPage extends SalesPortalPage {
	readonly uniqueElement: Locator;

	readonly productSection: Locator;

	constructor(page: Page) {
		super(page);

		this.productSection = this.page.locator("#products-section");
		this.uniqueElement = this.productSection;
	}

	@logStep("Change state product details by id")
	async changeStateProductDetailsById(id: number = 0) {
		await this.page.locator(`#heading${id}`).click();
	}

	@logStep("Get product details")
	async getProductDetails(id: number = 0) {
		const blocks = this.page.locator(`#heading${id} .c-details`);
		const texts = await blocks.allTextContents();

		return texts.map((text) =>
			parseSummaryCell(
				text,
				(label) => label as ProductDetailsTitle,
				(value) => value as string,
			),
		);
	}

	@logStep("Open edit product details modal")
	async openEditProductDetailsModal() {
		await this.page.locator("#edit-products-pencil").click();
	}
}
