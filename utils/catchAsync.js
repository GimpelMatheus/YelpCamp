module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next); //função que recebe outra e a utiliza, se tiver erro, chama ele
    }
}