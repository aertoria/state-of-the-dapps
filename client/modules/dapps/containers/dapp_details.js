import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import DappDetails from '../components/dapp_details.jsx';

export const composer = ({context, slug}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionReady = [Meteor.subscribe('dapps.bySlug', slug).ready()];
  const dataReady = () => {
    const selector = {slug};
    const dapp = Collections.Dapps.findOne(selector);
    onData(null, {dapp});
  };
  (subscriptionReady) ? dataReady() : onData();

};


export const depsMapper = (context, actions) => ({
  trackLink: actions.analytics.trackLink,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DappDetails);
