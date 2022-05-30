
const productModel = require("../models/product-model");

const getAllProducts =(req,res)=>{

    const {featured,company,name,sort,field,limit,page} = req.query;
    const queryObject = {};
    const nProductOfPage =  10;
    if(featured)
        queryObject.featured = featured==="true" ? true : false;
    if(company)
        queryObject.company = company;
    if(name)
        // regex name === like %name in sql
        // options "i" => no diff Uppercase vs Lowercase
        queryObject.name = {$regex:name,$options:"i"};
        // example 
        // .sort("-price") ==> price : 11, 9 , 3, 1
        // .sort("price") ==> price : 1, 3 , 9, 11
        // .sort("price name") ==> (price : 1, name: a ),(price : 3, name: b )

        // ==============================================================================
        // .select("name price") == select name price from XXXX (sql)
        // .select("") == select * from XXX (sql)
    productModel.find(queryObject)
    .sort(sort ? sort.split(",").join(" ") :"createdAt")
    .select(field ? field.split(",").join(" ") :"")
    .limit(limit? limit: nProductOfPage )
    .skip(page? ( page - 1 ) * nProductOfPage : 0)
    .then(products=>{
        res.status(200).json({nbHits:products.length,products});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    })
}
const getAllProductsStatic =(req,res)=>{
    const sort = req.query.sort;

    console.log(sort);
    // example 
    // .sort("-price") ==> price : 11, 9 , 3, 1
    // .sort("price") ==> price : 1, 3 , 9, 11
    // .sort("price name") ==> (price : 1, name: a ),(price : 3, name: b )


    productModel.find({}).sort(sort ? sort.split(",").join(" ") :"createdAt").select("").limit()
    .then(products=>{
        res.status(200).json({nbHits:products.length,products});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    })
}
// const findProducts =(req,res)=>{
//     productModel.find(req.query)
//     .then(products=>{
//         res.status(200).json({products,nbHits:products.length});
//     })
//     .catch(err=>{
//         res.status(500).json({msg:err});

//     })
// }
module.exports = {
    getAllProducts,
    getAllProductsStatic,
}