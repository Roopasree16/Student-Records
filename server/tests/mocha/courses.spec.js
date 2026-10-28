
const request = require("supertest");
const { expect } = require("chai");

const Course = require("../../models/Course");
const app = require("../../app");

const course = {
  name: "Data Structures",
  code: "CS201",
  credits: 4,
  department: "ISE",
};

describe("Course API (Mocha + Chai)", () => {
  let original;

  beforeEach(() => {
    original = {
      find: Course.find,
      create: Course.create,
      findByIdAndUpdate: Course.findByIdAndUpdate,
      findByIdAndDelete: Course.findByIdAndDelete,
    };
  });

  afterEach(() => {
    Object.assign(Course, original);
  });

  it("GET returns all courses", async () => {
    Course.find = async () => [{ _id: "1", ...course }];

    const res = await request(app).get("/api/courses");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.lengthOf(1);
  });

  it("POST creates a course", async () => {
    Course.create = async (data) => ({ _id: "abc", ...data });

    const res = await request(app)
      .post("/api/courses")
      .send(course);

    expect(res.status).to.equal(201);
    expect(res.body.code).to.equal("CS201");
  });

  it("PUT updates a course", async () => {
    Course.findByIdAndUpdate = async (id, data) => ({
      _id: id,
      ...course,
      ...data,
    });

    const res = await request(app)
      .put("/api/courses/abc")
      .send({ credits: 3 });

    expect(res.status).to.equal(200);
    expect(res.body.credits).to.equal(3);
  });

  it("DELETE returns 404 for an unknown course", async () => {
    Course.findByIdAndDelete = async () => null;

    const res = await request(app).delete("/api/courses/abc");

    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("Course not found");
  });
});
