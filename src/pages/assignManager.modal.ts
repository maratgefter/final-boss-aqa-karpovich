import { Locator, Page } from "@playwright/test";
import { BaseModal } from "./base/base.modal";

export class AssigManagerModal extends BaseModal {
	uniqueElement: Locator;

	constructor(page: Page) {
		super(page);

		this.uniqueElement = this.page.locator("#assign-manager-modal-container");
	}

	async searchManagerByName(name: string) {
		await this.page.locator("#manager-search-input").fill(name);
	}

	async selectManagerById(id: string) {
		await this.uniqueElement.locator(`[data-managerid="${id}"]`).click();
	}

	async assignManager() {
		await this.uniqueElement.locator("#update-manager-btn").click();
	}
}
