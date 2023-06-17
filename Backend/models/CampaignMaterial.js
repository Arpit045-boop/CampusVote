const mongoose = require('mongoose');

const CampaignMaterialSchema = new mongoose.Schema({
    id: {
        type:int,
        required: true,
        unique: true
      },

      text:{
        type:String,
        require: true
      },
      image:{
        type:int,
        required: false
      },
      createdOn:{
        type: Date,
        required: false
      },
      NomineeName:{
        type: String,
        required:true
      },
      NomineeId:{
        type: int,
        required: true
      }  

})

const CampaignMaterial = mongoose.model('CampaignMaterial', CampaignMaterialSchema);

module.exports = CampaignMaterial;
