const request = require("supertest");
const app = require("../app");

describe("Testing Login", () => {
	test("Login Success", (done) => {
		const userData = {
			email: "admin@mail.com",
			password: "1234",
		};

		request(app)
			.post("/login")
			.send(userData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(201);
				expect(body).toHaveProperty("access_token", expect.any(String));
				done();
			});
	});

	test("Login Failed, wrong password", (done) => {
		const userData = {
			email: "admin@mail.com",
			password: "12345678",
		};

		request(app)
			.post("/login")
			.send(userData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Wrong Email/Password");
				done();
			});
	});

	test("Login Failed, no Email in Database", (done) => {
		const userData = {
			email: "admin123@mail.com",
			password: "1234",
		};

		request(app)
			.post("/login")
			.send(userData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Wrong Email/Password");
				done();
			});
	});

	test("Login Failed, email and password are empty", (done) => {
		const userData = {
			email: "",
			password: "",
		};

		request(app)
			.post("/login")
			.send(userData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(400);
				expect(body).toHaveProperty("message", "Must Enter Email and Password");
				done();
			});
	});
});