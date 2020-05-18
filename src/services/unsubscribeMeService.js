export default function(app, req, res) {
  const { recipient, type } = req.query;
  const service = app.service('/unsubscribe');

  // check if there's already an unsubscribe
  return service.find({ query: {email: recipient, type: type}})
    .then((unsubscribes) => {

      if(unsubscribes.data.length > 0) {
        res.render('UnsubscribeMessage', {
          message: 'You are already unsubscribed :-)'
        });
      } else {

        // create a new unsubscribe for this email
        service.create({
          email: recipient,
          type: type
        }).then(() => {
          res.render('UnsubscribeMessage', {
            message: 'You\'ve been successfully unsubscribed from this type of email!'
          });

        }).catch(() => {
          res.render('UnsubscribeMessage', {
            message: 'Oops, something went wrong :-( Please contact support at support@giveth.io'
          });
        });
      }
    });
}
