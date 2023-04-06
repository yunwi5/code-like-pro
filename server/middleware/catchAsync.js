// Express does not automatically handles error from the async function.
// Defines error catching wrapper to wrap the async function.
function catchAsync(func) {
    return (req, res, next) => {
        func(req, res, next).catch((err) => next(err));
    };
}

module.exports = catchAsync;
