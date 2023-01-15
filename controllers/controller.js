const coinModel = require("../models/model")
const axios = require('axios')

//============= Get API =====================//

exports.getCoin = async(req,res)=>{
    try{
        
        let token = "e00a07ed-2685-45e4-ada7-a7cb4863afe8"
        
        let assets = await axios.get("https://api.coincap.io/v2/assets",{
            Headers:{
                Authorization:"Bearer " + token
            }
        })
        let coinData = assets.data

        let check = await coinModel.find()

        if(check.length == 0) {

         let arr = []

        for(i=0; i<coinData.data.length; i++){
            let doc = {
                name:coinData.data[i].name,
                symbol:coinData.data[i].symbol,
                marketCapUsd:coinData.data[i].marketCapUsd,
                priceUsd:coinData.data[i].priceUsd
            }
            let createData = await coinModel.create(doc)
             arr.push(doc)
        }
        return res.status(200).send({status:true,message:"Coin data is created"})
    }else{
          let getData = await coinModel.find()
          for(i=0; i<getData.length; i++){
            getData[i].changePercent24Hr = coinData.data[i].changePercent24Hr
          }
          for(i=0; i<getData.length; i++){
            getData.sort((x,y)=>( x.changePercent24Hr - y.changePercent24Hr ))
          }
          return res.status(200).send({status:true,data:getData})
    }
    }catch(error){
        return res.status(500).send({status:false , message : error.message})
    }
}