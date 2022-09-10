const withAuth = (req, res, next) => {
    if (req.session.user_id) return next();
      res.redirect('/login');
  };

const withAuthSign = (req, res, next) => {
    if (req.session.user_id) return (res.redirect('/'));
    next(); 
  };

  module.exports = { withAuth, withAuthSign } ;
