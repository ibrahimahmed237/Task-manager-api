
const request = require("supertest"); 
const app = require("../src/app.js");
const { userOneId, setupDatabase, userOne }=require("./fixtures/db.js");
const User = require("../src/models/user.js").User;

beforeEach(setupDatabase);
test("Should sign up", async () =>
{
    const res = await request(app).post("/users").send({
        name: "hfgh",
        email: "t@hfg.com",
        password: "fghjyuyd"
    }).expect(201);
});
test("Should login", async () =>
{
    const res = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOneId);
    expect(user.tokens[1].token).toBe(res.body.token);
});
test("Shouldn't login", async () =>
{
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "userOne.password"
    }).expect(400);
});
test("should get profile to user", async () =>
{
    await request(app).get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});
test("should not get profile to user", async () =>
{
    await request(app).get("/users/me")
        .send()
        .expect(401);
});
test("should delete profile to user", async () =>
{
    const res = await request(app).delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});
test("should not delete profile to user", async () =>
{
    await request(app).delete("/users/me")
        .send()
        .expect(401);
});
test("should update name", async () =>
{
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Ibrahim"
        }).expect(200);
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Ibrahim");
});
test("should not update name", async () =>
{
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "Ibrahim"
        }).expect(400);

});