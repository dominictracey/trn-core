import Posts from 'meteor/vulcan:posts'

/**
 * @summary Base parameters that will be common to all other view unless specific properties are overwritten
 */

/**
 * @summary User posts view
 */
Posts.addView("matchPost", terms => ({
  selector: {
    trnId: terms.trnId,
    status: Posts.config.STATUS_APPROVED,
    isFuture: {$ne: true}
  },
  options: {
    limit: 5,
    sort: {
      postedAt: -1
    }
  }
}));
