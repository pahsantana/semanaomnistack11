const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG',()=>{
    beforeEach(async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(()=>{
        connection.destroy();
    });
    it('should be able to create a new ONG', async ()=>{
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'asd')
        .send({
            name:"Associação De Beneficência e Filantropia São Cristóvão",
            email:"presidencia@saocristovao.com",
            WhatsApp:"1120297222",
            city: "São Paulo",
            uf:"SP"
        });
        //console.log(response.body); executar as migrations banco de dados teste
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});