import { expect, Locator, Page } from "@playwright/test";
import { SalesPortalPage } from "pages/salesPortal.page";
import { parseSummaryCell } from "utils/parseCells";
import { DeliveryDetailsTitle, HistoryChange } from "../common/order.types";
import { logStep } from "utils/report/logStep.utils";

export class OrderDetailsPage extends SalesPortalPage {
	readonly uniqueElement: Locator;

	readonly bottomSection: Locator;

	constructor(page: Page) {
		super(page);

		this.bottomSection = this.page.locator("#order-details-tabs-section");
		this.uniqueElement = this.bottomSection;
	}

	@logStep("Change bottom tab: {tab}")
	async changeBottomTab(tab: "delivery-tab" | "history-tab" | "comments-tab") {
		await this.page.locator(`#${tab}`).click();
	}

	@logStep("Get delivery information")
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

	@logStep("Open schedule delivery modal")
	async openScheduleDeliveryModal() {
		await this.page.locator("#delivery-btn").click();
	}

	@logStep("Get history change by index: {index}")
	async getHistoryChangeByIndex(index: number): Promise<HistoryChange> {
		const accordion = this.page.locator("#history-body .accordion").nth(index);

		const toggleButton = accordion.locator(".accordion-header button.accordion-button");

		const isExpanded = await toggleButton.getAttribute("aria-expanded");

		if (isExpanded !== "true") {
			await toggleButton.click();
		}

		const collapse = accordion.locator(".accordion-collapse");

		const dataRow = collapse.locator(".d-flex.justify-content-around.py-3.border-bottom").last();

		const cols = dataRow.locator(".his-col");

		const previous = (await cols.nth(1).textContent())?.trim() ?? "";
		const current = (await cols.nth(2).textContent())?.trim() ?? "";

		return { previous, current };
	}

	@logStep("Fill comment: {comment}")
	async fillComment(comment: string) {
		await this.page.locator("#textareaComments").fill(comment);
	}

	async sendComment() {
		await this.page.locator("#create-comment-btn").click();
	}

	@logStep("Get comment validation error text")
	async getCommentValidationErrorText() {
		const commentLocator = this.page.locator("#error-textareaComments");

		await expect(commentLocator).toBeVisible();
		return this.page.locator("#error-textareaComments").textContent();
	}
}
