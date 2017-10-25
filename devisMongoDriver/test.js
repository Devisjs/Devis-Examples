"use strict";
let devis = require("devis");

devis.use("./index");

devis.act({
    role: "mongodb",
    action: "connect"
}, { url: "mongodb://localhost:27017/prisma" }, (err, db) => {
    if (err) console.log(err);
    else {
        // devis.act({role:"mongodb",action:"find"},{db:db,collection:"Tf", params:{"Acronym" : "L"}, close:true},(err,result)=>{
        //     if(err) console.log(err);
        //     else{
        //         console.log(result);

        //     }
        // });
        // devis.act({role:"mongodb",action:"index"},{db:db,collection:"Tf", type:"getAllIndexes",close:false},(err,result)=>{
        //     if(err) console.log(err);
        //     else{
        //         console.log(result);

        //     }
        // });
        // devis.act({role:"mongodb",action:"index"},{db:db,collection:"Tf", type:"ifExist",index:["_id_","Acronym_1"],close:false},(err,result)=>{
        //     if(err) console.log(err);
        //     else{
        //         console.log(result);

        //     }
        // }); 
        let data = [{
            Value: "MN1",
            Name: "A3860",
            FamilyName: "DOUBLE Double DECK",
            PlanningValue: "A3860"
        }, {
            Value: "MN2",
            Name: "A3860",
            FamilyName: "DOUBLE Double DECKer",
            PlanningValue: "A3861"
        },

        ];
        // devis.act({ role: "mongodb", action: "insert" }, { type: "many", db: db, collection: "Tf", data: data }, (err, result) => {
        //     if (err) console.log(err);
        //     else {
        //         console.log(result);

        //     }
        // });
        // devis.act({role:"mongodb",action:"delete"},{type:"deleteOne", db: db,collection:"Tf",params:{Value: "MN"}},(err,result)=>{
        //     if (err) console.log(err);
        //     else {
        //         console.log(result);

        //     }
        // });
        let queryOr={
            $or:[{Value: "MN1"},{Value:"MN2"}]
        };
        let newData={$set: { Name: "A3860"}}
        // devis.act({ role: "mongodb", action: "update" }, { type: "many", db: db, collection: "Tf",query:query, data:newData}, (err, result) => {
        //     if (err) console.log(err);
        //     else {
        //         console.log(result);

        //     }
        // });

        // devis.act({ role: "mongodb", action: "find" }, { type: "many", collection: "Tf",query:{Name:"A3860"}, options: { fields: { "Acronym": 0, _id: 0 } } }, (err, result) => {
        //     if (err) console.log(err);
        //     else {
        //         console.log(result);

        //     }
        // });

        let getFormatDefects = [
            { "$match": { "RealRevisionDate": "29.05.2017"} },
            {
                "$group": {
                    "_id": { "IMS": "$IMsKey", "RealRevisionDate": "$RealRevisionDate"},
                    "count": { "$sum": 1 }
                }
            },
            {
                "$sort": { "_id.RealRevisionDate": -1 }
            }];

        devis.act({ role: "mongodb", action: "aggregate" }, { collection: "Production",aggQuery:getFormatDefects }, (err, result) => {
            if (err) console.log(err);
            else {
                console.log(result);

            }
        });

    }

});
