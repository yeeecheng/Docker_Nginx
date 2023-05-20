module.exports = {
    db: {
        // local 
        // HOST : 'localhost',
        // PORT:"3308",
        // PASSWORD: '',

        // run in docker
        HOST : 'linux_sql',
        PASSWORD: 'a10955',

        USER : 'root',
        DB: 'smart_farm_db',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    authentication: {
        ACCESS_TOKEN_SECRET: '99336bce90c845a827c2d7bcb0383066ca38f53dee519f765b04cdf2b1e83911d0033f789e4f94c63668794edd731eef99d25fe6b83ee5c3713ace15e6ea6d9e',
        REFRESH_TOKEN_SECRET: '25037836b542a3f43c0ea9505afa4fa2b33f87fab914ecc3d406fa992394d5be6fec4b46bb2a0217999f7da771e8c5ba0707ba96e23d201cdf9ace1ba5543dc0'
    },
    line_url:'https://c858-2001-b400-e289-90-f4a4-a527-a164-16ec.jp.ngrok.io/'
    
}