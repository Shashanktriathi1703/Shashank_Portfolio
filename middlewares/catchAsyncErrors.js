export function catchAsyncError(theFunction){
    return async (req, res, next) => {
        Promise.resolve(theFunction(req, res, next)).catch(next);
    };
};