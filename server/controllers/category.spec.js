'use strict'
//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let server = require("../../app");

describe("Category", () => {

    /*
   * Test the GET /category route
   */
    describe("GET /category", () => {
        it("it should list all categories", done => {
            chai
                .request(server)
                .get("/category")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Array");
                    done();
                });
        });
    });
    /*
   * Test the POST /category route
   */
    describe("POST /category", () => {
        it("It should create a category", done => {
            chai.request(server)
                .post('/category')
                .send({
                    title: "Category 2019"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Object");
                    done();
                });
        });
    });

    /*
     * Test the /category/:id route
     */
    describe("GET /category/:id", () => {
        it("it should GET the category by id", done => {
            chai
                .request(server)
                .get("/category/2")
                .end((err, res) => {
                    done();
                });
        });
    });

    /*
 * Test the POST /category/:id/update route
 */
    describe("POST /category/:id/update", () => {
        it("it should update category title by id", done => {
            chai
                .request(server)
                .post("/category/1/update")
                .send({
                    title: "Category 2019"
                })
                .end((err, res) => {
                    done();
                });
        });
    });

    /*
 * Test the GET /top3categories route
 */
    describe("GET /top3categories", () => {
        it("it should list all top 3 categories according post count", done => {
            chai
                .request(server)
                .get("/top3categories")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
    });

});