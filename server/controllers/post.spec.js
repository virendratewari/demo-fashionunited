'use strict'
//During the test the env variable is set to test
process.env.NODE_ENV || 'test';

let server = require("../../app");

describe("Post", () => {

    /*
   * Test the GET /post route
   */
    describe("GET /post", () => {
        it("it should list all posts", done => {
            chai
                .request(server)
                .get("/post")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Array");
                    done();
                });
        });
    });

    /*
   * Test the POST /post route
   */
    describe("POST /post", () => {
        it("It should create new post and should return post object", done => {
            chai.request(server)
                .post('/post')
                .send({
                    title: "Hello world",
                    text: "Hello worldHello worldHello world Hello world Hello world",
                    categoryId: "1"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Object");
                    done();
                });
        });
    });

    /*
     * Test the GET /post/:id route
     */
    describe("GET /post/:id", () => {
        it("it should GET post detail by id", done => {
            chai
                .request(server)
                .get("/post/3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Object");
                    done();
                });
        });
    });
    /*
     * Test the POST /post/:id/update route
     */
    describe("POST /post/:id/update", () => {
        it("It should update post by id", done => {
            chai.request(server)
                .post('/post/4/update')
                .send({
                    title: "Hello world 2019",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Object");
                    done();
                });
        });
    });

    /*
     * Test the GET /search route
     */
    describe("GET /search", () => {
        it("it should GET all post if post title or text or category of post containing like in searchText", done => {
            chai
                .request(server)
                .get("/search?searchText=demo" + global.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("Object");
                    done();
                });
        });
    });

});