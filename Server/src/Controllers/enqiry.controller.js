//post inquire details
const enqiry=require('../models/enqiry.model')


exports.findall = (req, res) => {
    enqiry.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some went"
            })
        })
}

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            massage: "Please fill all requird fields",
        });
    }
    const{ Name,Age,Email,Gender,Phone,Coures_of_interesrt,Address,Prefered_timing, Education_status, Mode,how_do_you_know} = req.body
    const enqiry1 = new enqiry({
        
        Name,Age,Email,Gender,Phone,Coures_of_interesrt,Address,Prefered_timing,Education_status, Mode,how_do_you_know
    });

    enqiry1.save().then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return res.status(500).send({
                message: err.message || "Something went worng",
            });
        });
}
