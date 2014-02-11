define([
  'ai/util',
  'ai/api/endpoint/mixins/aerisapibehavior',
  'ai/model',
  'ai/jsonp'
], function(_, AerisApiBehavior, Model, JSONP) {
  /**
   * A client-side representation of a single response object
   * from the Aeris API.
   *
   * @class AerisApiModel
   * @namespace aeris.api.endpoint.models
   * @extends aeris.Model
   * @mixes aeris.api.endpoint.mixins.AerisApiBehavior
   *
   * @constructor
   * @override
  */
  var AerisApiModel = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: '',
      action: '',
      params: {},
      jsonp: JSONP,
      server: 'http://api.aerisapi.com'
    });


    /**
     * Aeris API Endpoints from which
     * to request data.
     *
     * See http://www.hamweather.com/support/documentation/aeris/endpoints/
     * for available endpoints, actions, and parameters.
     *
     * @type {string}
     * @private
     * @property endpoint_
     */
    this.endpoint_ = options.endpoint;


    /**
     * Aeris API Action
     *
     * See http://www.hamweather.com/support/documentation/aeris/actions/
     *
     * @type {string}
     * @private
     * @property action_
     */
    this.action_ = options.action;


    /**
     * The locatin of the aeris API server.
     *
     * @type {string}
     * @private
     * @default 'http://api.aerisapi.com'
     * @property server_
     */
    this.server_ = options.server;


    /**
     * The JSONP utility for fetching AerisApi data.
     *
     * @type {aeris.JSONP}
     * @private
     * @property jsonp_
     */
    this.jsonp_ = options.jsonp || JSONP;


    /**
     * Parameters to include with the batch request.
     *
     * Note that parameters can also be attached
     * to individual endpoints defined in this.endpoints_.
     *
     * @type {aeris.api.params.models.Params|Object}
     *       Will be converted to Params instance, if passed in as a plain object.
     * @protected
     * @property params_
     */
    this.params_ = this.createParams_(options.params);


    Model.call(this, opt_attrs, options);
  };
  _.inherits(AerisApiModel, Model);
  _.extend(AerisApiModel.prototype, AerisApiBehavior);


  /**
   * @returns {*|string}
   * @protected
   */
  AerisApiModel.prototype.getEndpointUrl_ = function() {
    var url = AerisApiBehavior.getEndpointUrl_.call(this);

    if (this.id) {
      url += this.id
    }

    return url;
  };


  return _.expose(AerisApiModel, 'aeris.api.AerisApiModel');
});