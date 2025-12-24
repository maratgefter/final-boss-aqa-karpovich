import { expect, Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "pages/salesPortal.page";
import { parseSummaryCell } from "utils/parseCells";
import { OrderSummaryTitle } from "../common/order.types";
import { logStep } from "utils/report/logStep.utils";

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

	@logStep("Get order number")
	async getOrderNumber() {
		const orderNumberLocator = this.detailsHeader.locator("span.strong-details + span.fst-italic");
		await expect(orderNumberLocator).toBeVisible();
		return orderNumberLocator.textContent();
	}

	@logStep("Click cancel order button")
	async clickCancelOrderButton() {
		await this.page.locator("#cancel-order").click();
	}

	@logStep("Click reopen order button")
	async clickReopenButton() {
		await this.page.locator("#reopen-order").click();
	}

	@logStep("Get order status")
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

	@logStep("Refresh order")
	async refreshOrder() {
		return this.interceptResponse("/api/orders/", () => this.page.locator("#refresh-order").click());
	}

	@logStep("Open assign manager modal")
	async openAssignManagerModal() {
		await this.page.locator("#assigned-manager-container").click();
	}

	@logStep("Open unassign manager modal")
	async openUnassignManagerModal() {
		await this.page.locator("[onclick*='renderRemoveAssignedManagerModal']").click();
	}

	@logStep("Open edit assigned manager modal")
	async openEditAssignedManagerModal() {
		await this.page.locator("[onclick*='renderAssigneManagerModal']").click();
	}
}
