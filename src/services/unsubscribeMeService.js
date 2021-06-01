import { EmailSubscribeTypes } from '../models/types.model';

export default function(app, req, res) {
  const { recipient, type } = req.query;
  const service = app.service('/unsubscribe');

  if (!Object.values(EmailSubscribeTypes).includes(type)) {
    return res.render('UnsubscribeMessage', {
      message: 'Invalid subscribe type!'
    });
  }

  return service.find({ query: {email: recipient, type: type}})
    .then((unsubscribes) => {

      // check if there's already an unsubscribe
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
