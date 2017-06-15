'use strict';

module.exports = function(Appusers) {
  Appusers.observe('after save', function(ctx, next) {
    console.log(ctx);
    if (ctx.isNewInstance === true) {
      var instance = ctx.instance;
      instance.createAccessToken(1209600000, function(err, response) {
        if (err === null) {
          ctx.instance["token"] = response.id;
          console.log('token created', ctx);
        }
        next();
      });
    } else {
      next();
    }
  });
};
