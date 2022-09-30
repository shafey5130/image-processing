import app from "./../../public/index";
import supertest from "supertest";

const request = supertest(app);

describe("API tests", () => {
  describe("/api/img endpoint validation", () => {
    it("Check if filename get parameter exists is working", () => {
      request.get("/api/img").then((res) => {
        expect(res.text).toBe("Filename parameter is required");
      });
    }); // Check if filename get parameter exists is working
    it("Check if filename exists response is working", () => {
      request.get("/api/img/?filename=fjord.jpg").then((res) => {
        expect(res.status).toBe(200);
      });
    }); // Check if filename exists response is working
    it("Check if filename not exists response is working", () => {
      request.get("/api/img/?filename=asd1324m1k4fa45mksdf.jgp").then((res) => {
        expect(res.text).toBe("404");
      });
    }); // Check if filename not exists response is working
  }); // /api/img endpoint validation
}); // API tests
