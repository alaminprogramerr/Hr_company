const clientModel = require('../model/clientModel')
const clientValidator = require('../validator/clientValidator')

const createClient= (req, res)=>{
    const verify =clientValidator.clientValidator(req.body)
    if(!verify.isValid){
        return res.status(400).json(verify.err)
    }
    new clientModel(req.body).save()
    .then(newClient=>{
        res.status(200).json({massage:"Client created successfull ", Client:newClient})
    })
    .catch(err=>{
        return res.status(500).json({massage:" server error occured "})
    })
    
}


const updateClient=(req,res)=>{
    clientModel.findById(req.params.id)
    .then(client=>{
        client.typeOfCompany=req.body.typeOfCompany
        client.entrepriseName=req.body.entrepriseName
        client.ownerFirstName=req.body.ownerFirstName
        client.ownerlastName=req.body.ownerlastName
        client.expertise=req.body.expertise
        client.companyAddress=req.body.companyAddress
        client.phoneNumber=req.body.phoneNumber
        client.note=[req.body.note,...client.note]
        client.save()
        .then(updated=>{
            res.status(200).json({massage:" Updated successfull ", updateClient:updated})
        })
    })
    .catch(err=>{
        return res.status(500).json({massage:" server error occured "})
    })
}


const deleteClient = (req, res)=>{
    clientModel.findByIdAndDelete(req.params.id)
    .then(deleted=>{
        return res.status(200).json({massage:" Deleted successfull" , deleted:deleted})
    })
    
    .catch(err=>{
        return res.status(500).json({massage:" server error occured "})
    })
}
const allClient= (req, res)=>{
    clientModel.find()
    .then(clients=>{
        if(clients.length<1){
            return res.status(200).json({clients:false})
        }
        res.status(200).json(clients)
    })
    .catch(err=>{
        return res.status(500).json({massage:" Server error occurd"})
    })
}
const singleClient= (req, res)=>{
    clientModel.findById(req.params.id)
    .then(client=>{
        return res.status(200).json(client)
    })
    .catch(err=>{
        return res.status(500).json({massage:" Server error occurd"})
    })
    
}
const searchClient=(req, res)=>{
    clientModel.find()
    .then(clients=>{
        let searched=[]
        clients.forEach(single=>{
            console.log(single.phoneNumber)
            console.log(req.body.text)
            if(req.body.text===''){
                return res.status(200).json(clients)
            }
            if(single.phoneNumber===req.body.text){
                console.log('matched')
                searched.push(single)
            }
        })
        return res.status(200).json(searched)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:'server error occurd'})
    })
}
const sortClientByType=(req, res)=>{
    let sorted=[]
    clientModel.find()
    .then(clients=>{
        if(req.body.text.toLocaleLowerCase()==='no sort'){
            return res.status(200).json(clients)
        }
        clients.forEach(client=>{
            console.log(client.typeOfCompany)
            console.log(req.body.text)
            if(client.typeOfCompany.toLocaleLowerCase()===req.body.text.toLocaleLowerCase()){
                console.log('added')
                sorted.push(client)
            }
        })
        res.status(200).json(sorted)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"server error occurd"})
    })
}
module.exports = { 
    createClient,updateClient,deleteClient,allClient,singleClient,sortClientByType,searchClient
}