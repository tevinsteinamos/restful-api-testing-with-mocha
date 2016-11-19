process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let Blog = require('../controllers/models/blog')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Blogs', () => {
    beforeEach((done) => {
        Blog.remove({}, (err) => { //empty database
            done()
        })
    })

    describe('/GET blog', () => {
        it('it should GET all the blogs', (done) => {
            chai.request(server)
                .get('/blog')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })

    describe('/POST blog', () => {
        it('it should not POST a blog without postedBy field', (done) => {
            let blog = {
                title: "Hellow",
                content: "Hellow how are ya?"
            }
            chai.request(server)
                .post('/blog')
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.should.have.property('postedBy')
                    res.body.errors.postedBy.should.have.property('kind').eql('required')
                    done()
                })
        })

        it('it should POST a blog ', (done) => {
            let blog = {
                title: "Sahbawow",
                content: "Wow",
                postedBy: "Sahbana"
            }
            chai.request(server)
                .post('/blog')
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql('Blog successfully added!')
                    res.body.blog.should.have.property('title')
                    res.body.blog.should.have.property('content')
                    res.body.blog.should.have.property('postedBy')
                    done()
                })
        })
    })

    describe('/GET/:id blog', () => {
        it('it should GET a blog by the given id', (done) => {
            let blog = new Blog({ title: "Ini test title", content: "Ini test content", postedBy: "Gue" })
            blog.save((err, blog) => {
                chai.request(server)
                    .get('/blog/' + blog.id)
                    .send(blog)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('title')
                        res.body.should.have.property('content')
                        res.body.should.have.property('postedBy')
                        res.body.should.have.property('_id').eql(blog.id)
                        done()
                    })
            })

        })
    })

    describe('/PUT/:id blog', () => {
        it('it should UPDATE a blog given the id', (done) => {
            let blog = new Blog({ title: "Ini test title", content: "Ini test content", postedBy: "Ivan" })
            blog.save((err, blog) => {
                chai.request(server)
                    .put('/blog/' + blog.id)
                    .send({ title: "Ini test title", content: "Ini test content", postedBy: "Ivana" })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('message').eql('Blog updated!')
                        res.body.blog.should.have.property('postedBy').eql("Ivana")
                        done()
                    })
            })
        })
    })

    describe('/DELETE/:id blog', () => {
        it('it should DELETE a blog given the id', (done) => {
            let blog = new Blog({ title: "Ini test title", content: "Ini test content", postedBy: "Ivan" })
            blog.save((err, blog) => {
                chai.request(server)
                    .delete('/blog/' + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('message').eql('Blog successfully deleted!')
                        res.body.result.should.have.property('ok').eql(1)
                        res.body.result.should.have.property('n').eql(1)
                        done()
                    })
            })
        })
    })



})
