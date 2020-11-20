const request = require("supertest")
const app = require("../app")

describe('Test endpoints POST /login',()=>{
    it('test login success',(done)=>{   
        request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: 'admin'
        })
        .then(response=>{
            let {body, status} = response
            expect(status).toEqual(200)
            expect(body).toHaveProperty('id',expect.any(Number))
            expect(body).toHaveProperty('email','admin@admin.com')
            expect(body).toHaveProperty('role','admin')
            expect(body).toHaveProperty('access_token',expect.any(String))
            done()
        })
        .catch(err=>{
            console.log(err);
            done(err)
        })
    },20000)
    it('test email ada password salah',(done)=>{
        request(app)
        .post('/login')
        .send({
            email: 'admin@admin.com',
            password: 'salah'
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg','Invalid email or password')
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    },30000)
    it('test email tidak ada di db',(done)=>{
        request(app)
        .post('/login')
        .send({
            email: 'salah@email.com',
            password: 'admin'
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg','Invalid email or password')
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    },30000)
    it('test tidak memasukan email dan password',(done)=>{
        request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        })
        .then(response=>{
            const {body,status} = response
            expect(status).toEqual(401)
            expect(body).toHaveProperty('msg','Email and Password cannot be empty')
            done()
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    },20000)
})