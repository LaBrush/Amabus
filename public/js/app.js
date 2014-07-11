

App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({namespace: 'amabus-ember'});
App.ApplicationSerializer = DS.LSSerializer.extend();


App.ApplicationAdapter = DS.LSAdapter.extend({namespace: 'amabus-ember'});
App.ApplicationSerializer = DS.LSSerializer.extend();

App.ApplicationAdapter = DS.FixtureAdapter;

