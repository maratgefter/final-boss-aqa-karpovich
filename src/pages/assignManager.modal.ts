import { logStep } from "utils/report/logStep.utils";
import { BaseModal } from "./base/base.modal";

export class AssigManagerModal extends BaseModal {
	readonly uniqueElement = this.page.locator("#assign-manager-modal-container");
	readonly managerSearchInput = this.uniqueElement.locator("#manager-search-input");
	readonly updateManagerButton = this.uniqueElement.locator("#update-manager-btn");

	readonly managerRow = (id: string) => this.uniqueElement.locator(`[data-managerid="${id}"]`);

	@logStep("Search manager by name")
	async searchManagerByName(name: string) {
		await this.managerSearchInput.fill(name);
	}

	@logStep("Select manager by id")
	async selectManagerById(id: string) {
		await this.managerRow(id).click();
	}

	@logStep("Assign manager")
	async assignManager() {
		await this.updateManagerButton.click();
	}
}
