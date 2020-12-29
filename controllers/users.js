'use strict'; 

module.exports = function(_, passport,UserValidation){
     return {
         SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.post('/', UserValidation.LoginValidation, this.postLogin);
            router.post('/signup',UserValidation.SignUpValidation, this.postSignUp);
         },

         indexPage: function(req,res){
            const errors = req.flash('error');
             return res.render('index', {title: 'KuraKani | Login', messages: errors, hasErrors: errors.length > 0});
         },
         postLogin: passport.authenticate('local.Login',{
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
          
         getSignUp: function(req, res){
             const errors = req.flash('error');
             return res.render('signup', {title: 'KuraKani | SignUp', messages: errors, hasErrors: errors.length > 0});
         },

         postSignUp: passport.authenticate('local.signup',{
             successRedirect: '/home',
             failureRedirect: '/signup',
             failureFlash: true
         }),
         homePage: function(req, res){
            return res.render('home'); 
         }
     }
}