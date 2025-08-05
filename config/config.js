const dotenv = require('dotenv')
dotenv.config()
const getprefix=()=>{
    var env = process.env.NODE_ENV;
    if (!env){
        return env='DEV'
    }
    return env
}

const databaseconfig =()=>{
    const env =getprefix();
    
    return{
        username:process.env[`${env}_USERNAME`]||'',
        database:process.env[`${env}_database`]||'',
        password:process.env[`${env}_password`]||'',
        host:process.env[`${env}_Host`]||'',
        port:process.env[`${env}_PORT`]||5432,
        dialect:'postgres'
    }
}

module.exports=databaseconfig