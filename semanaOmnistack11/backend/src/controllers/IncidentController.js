const connection = require('../database/connection');
module.exports={
    async index(request,response){
        const{ page=1} = request.query;
        const [count]= await connection('incidents').count();
        //console.log(count);
        const incidents= await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id') //relacionar dados tabela 
        .limit(5)
        .offset((page -1)*5) // ciclo repetição paginação
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.WhatsApp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    //async listSpecificforOng
    async create(request,response){
        const {title, description, value}=request.body;
        const ong_id=request.headers.authorization; //cabeçalho guarda (contexto) autentificação usuarios idioma 
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id}); //front-end identificar id
    },
    async delete(request,response){
        const{id} = request.params;
        const ong_id=request.headers.authorization; //id da nossa ongs foi criado pela ong mesmo, caso de uma outra ong
        const incident= await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
        if(incident.ong_id != ong_id){
            return response.status(401).json({error:'Operation not permitted'});
        }
        await connection('incidents').where('id',id).delete();
        return response.status(204).send();
    }
};

