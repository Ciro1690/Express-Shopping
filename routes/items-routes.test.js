process.env.NODE_ENV = 'test'

const request = require('supertest')

const app = require('../app')
let items = require('../fakeDb')

let peaches = { name: "peaches", price: 1.5 }

beforeEach(function() {
    items.push(peaches)
})

afterEach(function() {
    items.length = 0
})

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"items": [peaches]})
    })
})

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${peaches.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"item": peaches})
    })
    test("Responds with 404 if invalid", async function () {
        const resp = await request(app).get('/items/noitem')
        expect(resp.statusCode).toBe(404)
    })
})

describe("POST /items", function() {
    test("Add an item to the list", async function() {
        const resp = await request(app)
            .post(`/items`)
            .send({
                name: 'bone',
                price: 12
            })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({"added": {name: 'bone', price: 12}})
    })
})

describe("PATCH /items/:name", function() {
    test("Update an item on the list", async function() {
        const resp = await request(app)
            .patch(`/items/${peaches.name}`)
            .send({
                name: 'plums',
                price: 1.25                
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"updated": {name: 'plums', price: 1.25}})
    })
})

describe("DELETE /items/:name", function() {
    test("Delete an item on the list", async function() {
        const resp = await request(app)
            .delete(`/items/${peaches.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"message": "Deleted"})
    })
})


