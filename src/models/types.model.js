//TODO: It must be fetched from feathers-Giveth
const EmailSubscribeTypes = {
  DONATION_RECEIPT: 'donation-receipt',
  DONATION_RECEIVED: 'donation-received',
  REQUEST_DELEGATION: 'request-delegation',
  DONATION_DELEGATED: 'donation-delegated',
  MILESTONE_PROPOSED: 'milestone-proposed',
  PROPOSED_MILESTONE_EDITED: 'proposed-milestone-edited',
  PROPOSED_MILESTONE_ACCEPTED: 'proposed-milestone-accepted',
  PROPOSED_MILESTONE_REJECTED: 'proposed-milestone-rejected',
  MILESTONE_REQUEST_REVIEW: 'milestone-request-review',
  MILESTONE_REVIEW_APPROVED: 'milestone-review-approved',
  MILESTONE_REVIEW_REJECTED: 'milestone-review-rejected',
  MILESTONE_CREATED: 'milestone-created',
  MILESTONE_CANCELLED: 'milestone-canceled',
  DONATIONS_COLLECTED: 'donations-collected',
};

module.exports = {
  EmailSubscribeTypes,
};
