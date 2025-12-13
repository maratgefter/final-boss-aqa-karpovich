import { test } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { TAGS } from "data/tags";
import { getnotificationsSchema } from "data/schemas/notifications/getNotificationSchema";

test.describe("[API][Notifications]", () => {
	let token = "";

	test("Get all notification", { tag: [TAGS.SMOKE] }, async ({ loginApiService, notificationsApi }) => {
		token = await loginApiService.loginAsAdmin();

		const allNotifications = await notificationsApi.getNotifications(token);
		validateResponse(allNotifications, {
			status: STATUS_CODES.OK,
			schema: getnotificationsSchema,
			IsSuccess: true,
			ErrorMessage: null,
		});
	});
});
