export const errorMiddleware = (err, req, res, next) => {

    return res.status(err.statusCode || 500).json({
        status: false,
        message: err.message || "Internal Server Error"
    });

};