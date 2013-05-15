define([
  'aeris', 'aeris/aerisapi',
  'base/animations/aerisinteractivetile'
], function(aeris) {

  /**
   * @fileoverview Shared implementation of the AerisInteractiveTile strategy.
   */


  aeris.provide('aeris.maps.layerstrategies.mixins.AerisInteractiveTile');


  /**
   * A mixin for shared implementation of the AerisInteractiveTile strategy.
   *
   * @const
   */
  aeris.maps.layerstrategies.mixins.AerisInteractiveTile = {


    /**
     * @override
     */
    getTimes: function(layer) {
      return aeris.AerisAPI.getTileTimes(layer);
    },


    /**
     * @override
     */
    createAnimation: function(layer) {
      return new aeris.maps.animations.AerisInteractiveTile(layer);
    },


    /**
     * @override
     */
    autoUpdate: function(layer) {
      var fnCallback = function(times) {
        layer.time = times[0];
        layer.trigger('autoUpdate', layer.time);
      };
      aeris.AerisAPI.getInstance().onTileTimesUpdate(layer, fnCallback, this);
    }

  };


  return aeris.maps.layerstrategies.mixins.AerisInteractiveTile;

});