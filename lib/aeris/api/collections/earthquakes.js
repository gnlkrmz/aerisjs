define([
  'ai/util',
  'ai/api/collections/pointdatacollection',
  'ai/api/models/earthquake',
  'ai/datehelper'
], function(_, PointDataCollection, Earthquake, DateHelper) {
  /**
   * A representation of earthquake data from the
   * Aeris API 'earthquake' endpoint.
   *
   * @publicApi
   * @class Earthquakes
   * @namespace aeris.api.collections
   * @extends aeris.api.collections.PointDataCollection
   *
   * @constructor
   * @override
   */
  var Earthquakes = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      params: {},
      model: Earthquake,
      endpoint: 'earthquakes',
      action: 'within'
    });

    _.defaults(options.params, {
      from: new DateHelper().addWeeks(-7),
      to: new Date(),
      radius: '3000miles'
    });

    PointDataCollection.call(this, opt_models, options);
  };
  _.inherits(Earthquakes, PointDataCollection)


  return _.expose(Earthquakes, 'aeris.api.collections.Earthquakes');
});