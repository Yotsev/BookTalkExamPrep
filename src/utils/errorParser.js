function getFirstMongooseError(error){
    const errors = Object.keys(error.errors).map(key=> error.errors[key].message);

    return errors[0];
}

exports.getErrorMessage = (error)=> {
    if (error.name === 'Error') {
            return error.message;
    }else{
        return getFirstMongooseError(error);
    }
};