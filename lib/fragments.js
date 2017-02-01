import { registerFragment, getFragment } from 'meteor/nova:lib';
import gql from 'graphql-tag';

const TrnUsersMinimumInfoFragment = gql`
  fragment TrnUsersMinimumInfo on User {
    ...UsersMinimumInfo
    avatar
  }
  ${getFragment('UsersMinimumInfo')}
`;

registerFragment(TrnUsersMinimumInfoFragment, 'UsersMinimumInfo');

console.log('// UsersMinimumInfo', getFragment('UsersMinimumInfo'));
console.log('// -> test on CommentsList: CommentsList is still called with the original gql UsersMinimumInfo and not TrnUsersMinimumInfo');
