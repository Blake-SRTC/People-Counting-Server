const { Schema, model } = require("mongoose");

const countShema = new Schema({
    entrada: {
        type: Number,
        default: 0,
    },
    salida: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: function (){
            // Correccion zona horaria
            var utc = new Date();
            utc.setHours(utc.getHours() + -4);
            return utc;
        },
    }
});

module.exports = model("count", countShema);
