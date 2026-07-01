// wrapper function to handle async req,res, errors, next in express routes
// this function helps to avoid try catch blocks in every route handler
// its a higher order function that takes a function as an argument and returns a new function that wraps the original function in a try catch/promises block

// option 1 (with try catch)
// const asyncHandler = (fn) => async (req,res,next) => {
//     try{
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({ message: error.message });
//     }
// };

// option 2 (with promise catch)
export const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(reqHandler(req, res, next))
            .catch((error) => next(error));
    }
};