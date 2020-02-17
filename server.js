const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
    const query = req.query;
    if(query) {
        db('accounts')
        .orderBy(query.sortby || "id", query.sortdir || 'asc')
        .limit(query.limit || null)
        .then(accounts => {
            res.status(200).json(accounts);
        }) 
        .catch (err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
    } else {
        db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        }) 
        .catch (err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
    }
})

server.get("/api/accounts/:id", (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .then(accounts => {
        if(accounts.length) {
            res.status(200).json(accounts)
        } else {
            res.status(404).json({ message: 'Could not find user with given id.' })
        }
    }).catch (err => {
        res.status(500).json({ message: 'Failed to get user' });
    });
})

server.post("/api/accounts", (req, res) => {
    db('accounts').insert({ name: req.body.name, budget: req.body.budget })
    .then(created => {
        res.status(201).json(created)
    }).catch (err => {
        res.status(500).json({ message: 'Failed to create user' });
    });
})

server.put("/api/accounts/:id", (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .update({ name: req.body.name, budget: req.body.budget })
    .then(updated => {
        res.status(200).json(updated)
    }).catch (err => {
        res.status(500).json({ message: 'Failed to update user' });
    });
})

server.delete("/api/accounts/:id", (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .del()
    .then(deleted => {
        res.status(200).json(deleted)
    }).catch (err => {
        res.status(500).json({ message: 'Failed to delete user' });
    });
})

module.exports = server;