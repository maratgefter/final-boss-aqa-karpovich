import { expect, Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "pages/salesPortal.page";
import { CustomerDetailsTitle, ProductDetailsTitle, DeliveryDetailsTitle, OrderSummaryTitle } from "./order.types";
import { parseSummaryCell } from "utils/parseCells";

export class OrderDetailsPage extends SalesPortalPage {
	readonly uniqueElement: Locator;
	readonly backLink: Locator;

	readonly detailsHeader: Locator;

	constructor(page: Page) {
		super(page);

		this.detailsHeader = this.page.locator("#order-details-header");
		this.backLink = this.page.locator("a", { hasText: "Orders" });

		this.uniqueElement = this.detailsHeader;
	}

	async getOrderNumber() {
		const orderNumberLocator = this.detailsHeader.locator("span.strong-details + span.fst-italic");
		await expect(orderNumberLocator).toBeVisible();
		return orderNumberLocator.textContent();
	}

	async clickCancelOrderButton() {
		await this.page.locator("#cancel-order").click();
	}

	async getOrderStatus() {
		const blocks = this.page.locator("#order-status-bar-container .me-2");
		const texts = await blocks.allTextContents();

		return texts.map((text) =>
			parseSummaryCell(
				text,
				(label) => label as OrderSummaryTitle,
				(value) => value as string,
			),
		);
	}

	async refreshOrder() {
		return this.interceptResponse("/api/orders/", () => this.page.locator("#refresh-order").click());
	}

	async openAssignManagerModal() {
		await this.page.locator("#assigned-manager-container").click();
	}

	async openUnassignManagerModal() {
		await this.page.locator("[onclick*='renderRemoveAssignedManagerModal']").click();
	}

	async openEditAssignedManagerModal() {
		await this.page.locator("[onclick*='renderAssigneManagerModal']").click();
	}

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

	async openChangeCustomerModal() {
		await this.page.locator("#edit-customer-pencil").click();
	}

	async changeStateProductDetailsById(id: number = 0) {
		await this.page.locator(`#heading${id}`).click();
	}

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

	async openEditProductDetailsModal() {
		await this.page.locator("#edit-products-pencil").click();
	}

	async changeBottomTab(tab: "delivery-tab" | "history-tab" | "comments-tab") {
		await this.page.locator(`#${tab}`).click();
	}

	async getDeliveryInformation() {
		const blocks = this.page.locator("#delivery .c-details");
		const texts = await blocks.allTextContents();

		return texts.map((text) =>
			parseSummaryCell(
				text,
				(label) => label as DeliveryDetailsTitle,
				(value) => value as string,
			),
		);
	}

	async openScheduleDeliveryModal() {
		await this.page.locator("#delivery-btn").click();
	}
}
