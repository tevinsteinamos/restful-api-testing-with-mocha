let mongoose = require('mongoose');
let Blog = require('../models/blog');

function getBlogs(req, res) {
    let query = Blog.find({});
    query.exec((err, blogs) => {
        if(err) res.send(err);
        res.json(blogs);
    });
}

function postBlog(req, res) {
    var newBlog = new Blog(req.body);
    newBlog.save((err,blog) => {
        if(err) {
            res.send(err);
        }
        else { 
            res.json({message: "Blog successfully added!", blog });
        }
    });
}

function getBlog(req, res) {
    Blog.findById(req.params.id, (err, blog) => {
        if(err) res.send(err);
        res.json(blog);
    });     
}

function deleteBlog(req, res) {
    Blog.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Blog successfully deleted!", result });
    });
}

function updateBlog(req, res) {
    Blog.findById({_id: req.params.id}, (err, blog) => {
        if(err) res.send(err);
        Object.assign(blog, req.body).save((err, blog) => {
            if(err) res.send(err);
            res.json({ message: 'Blog updated!', blog });
        }); 
    });
}

module.exports = { getBlogs, postBlog, getBlog, deleteBlog, updateBlog };