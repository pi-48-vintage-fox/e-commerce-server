const request = require("supertest");
const app = require("../app");

const bannerData = {
	name: "#NGGAPERLUDIET",
	image_url: "https://cdn.gramedia.com/uploads/marketing/1-NggakPerluDiet-Gramedia.com_Storefront-01__wauto_h336.png",
	is_active: true,
};

const updatedBannerData = {
	is_active: false,
};

let id = 0;

describe("Testing Create Banner", () => {
	test("Create Banner Success", (done) => {
		request(app)
			.post("/banners")
			.send(bannerData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				id = body.id;
				expect(status).toBe(201);
				expect(body).toHaveProperty("id", expect.any(Number));
				expect(body).toHaveProperty("name", bannerData.name);
				expect(body).toHaveProperty("is_active", bannerData.is_active);
				expect(body).toHaveProperty("image_url", bannerData.image_url);
				done();
			});
	});

	test("Create Banner Success", (done) => {
		request(app)
			.post("/banners")
			.send(bannerData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});
});

describe("Testing Read Banners", () => {
	test("Get all Banners Success", (done) => {
		request(app)
			.get("/banners")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							name: expect.any(String),
							image_url: expect.any(String),
							is_active: expect.any(Boolean),
						}),
					]),
				);
				done();
			});
	});

	test("Get All Banners Failed, No access token", (done) => {
		request(app)
			.get("/banners")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});
});

describe("Testing Update Status Banner", () => {
	test("Update Banner Success", (done) => {
		request(app)
			.patch(`/banners/${id}`)
			.send(updatedBannerData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});

	test("Update Banner Success", (done) => {
		request(app)
			.patch(`/banners/${id}`)
			.send(updatedBannerData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						image_url: expect.any(String),
						is_active: expect.any(Boolean),
					}),
				);
				done();
			});
	});
});

describe("Testing Delete Banner", () => {
	test("Delete Banner Success", (done) => {
		request(app)
			.delete(`/banners/${id}`)
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toHaveProperty("message", "Delete Banner successful");
				done();
			});
	});

	test("Delete Banner Failed, No access token", (done) => {
		request(app)
			.delete(`/banners/${id}`)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});
});