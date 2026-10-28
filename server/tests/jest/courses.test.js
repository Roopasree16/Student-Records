
const request = require("supertest");

jest.mock("../../models/Course", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const Course = require("../../models/Course");
const app = require("../../app");

const course = {
  name: "Data Structures",
  code: "CS201",
  credits: 4,
  department: "ISE",
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/courses", () => {
  it("returns all courses", async () => {
    Course.find.mockResolvedValue([{ _id: "1", ...course }]);

    const res = await request(app).get("/api/courses");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe("Data Structures");
  });
});

describe("GET /api/courses/:id", () => {
  it("returns a course by ID", async () => {
    Course.findById.mockResolvedValue({
      _id: "abc",
      name: "Data Structures",
      code: "CS201",
      credits: 4,
      department: "ISE",
    });

    const res = await request(app).get("/api/courses/abc");

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Data Structures");
  });
});

describe("POST /api/courses", () => {
  it("creates a course and returns 201", async () => {
    Course.create.mockResolvedValue({ _id: "abc", ...course });

    const res = await request(app)
      .post("/api/courses")
      .send(course);

    expect(res.status).toBe(201);
    expect(res.body.code).toBe("CS201");
  });

  it("returns 400 for invalid course data", async () => {
    Course.create.mockRejectedValue(
      new Error("Course validation failed")
    );

    const res = await request(app)
      .post("/api/courses")
      .send({ name: "Data Structures" });

    expect(res.status).toBe(400);
  });
});

describe("PUT /api/courses/:id", () => {
  it("updates a course", async () => {
    Course.findByIdAndUpdate.mockResolvedValue({
      _id: "abc",
      ...course,
      credits: 3,
    });

    const res = await request(app)
      .put("/api/courses/abc")
      .send({ credits: 3 });

    expect(res.status).toBe(200);
    expect(res.body.credits).toBe(3);
  });
});

describe("DELETE /api/courses/:id", () => {
  it("returns 404 if the course does not exist", async () => {
    Course.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete("/api/courses/abc");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Course not found");
  });
});
