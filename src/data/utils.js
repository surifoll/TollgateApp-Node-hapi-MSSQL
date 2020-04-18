"use strict";
const fse = require("fs-extra");
const { join } = require("path");
const bcrypt = require('bcrypt');

let PayStack = require('paystack-node')

let APIKEY = 'sk_test_****************' //better asw environment variable loging to paystack to get your api key
//const environment = process.env.NODE_ENV

const paystack = new PayStack(APIKEY, 'dev')

const feesCalculator = new PayStack.Fees();
const feeCharge = feesCalculator.calculateFor(250000)


const loadSqlQueries = async folderName => {
    // determine the file path for the folder
    const filePath = join(process.cwd(), "src", "data", folderName);
    // get a list of all the files in the folder
    const files = await fse.readdir(filePath);
    // only files that have the .sql extension
    const sqlFiles = files.filter(f => f.endsWith(".sql"));
    // loop over the files and read in their contents
    const queries = {};
    for (let i = 0; i < sqlFiles.length; i++) {
        const query = fse.readFileSync(join(filePath, sqlFiles[i]), { encoding: "UTF-8" });
        queries[sqlFiles[i].replace(".sql", "")] = query;
    }
    return queries;
};
const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const initializePayment = async (data) => {
    // initializeTransaction
    const promise6 = paystack.initializeTransaction({
        reference: data.ref,  
        amount: data.amount, // Naira (remember you have to pass amount in kobo)
        email: data.email,  
        subaccount: data.subaccount,  
    })

     
    return promise6.then(function (response) {
        return response
    }).catch((error) => {
        console.log(error,'error');
        
        return { body: {error : 'initialization failed', status : false}};
    });

}
const verifyPayment = async (data) => {
    const promise7 = paystack.verifyTransaction({
        reference: data.ref, //"7PVGX8MEk85tgeEpVDtD"
    })

    return promise7.then(function (response) {
        return response
    }).catch((error) => {

        console.log(error,'error');
        
        return{ body: {error : 'verification failed', status : false}};
    });
}
const createCustomer = async (userModel) => {
    // createCustomer
    const promise3 = paystack.createCustomer({
        email: userModel.email, //'malik.onyemah@gmail.com',
        first_name: userModel.firstName, //'Malik',
        last_name: userModel.lastName, //'Onyemah',
        phone: userModel.phone, //'+2347135548369'
    })

    promise3.then(function (response) {
        return response.body
    }).then(body => {
        return res.status(200).json({ id: body.data.id })
    });
}
const  hashPassword = async (password) =>{
    // Generate a salt at level 10 strength
   
    
    var salt = await bcrypt.genSalt(10);
   
    var  hash = bcrypt.hash(password, salt, null);

    console.log(hash,'lllllllllllllll');
    
    return hash;

}
module.exports = {
    loadSqlQueries,
    utilities: {
        uuid,
        initializePayment,
        verifyPayment,
        hashPassword
    }
};
