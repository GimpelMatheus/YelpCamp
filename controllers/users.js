const User = require('../models/user');

module.exports.userRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    //opções para gente usar, são várias estratégias, vamos autenticaar o local, mas tem google, facebook, etc 
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', 'Welcome back');
    res.redirect(redirectUrl); //só vai vir aqui se passar no registro

}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!!");
    res.redirect('/login');
}