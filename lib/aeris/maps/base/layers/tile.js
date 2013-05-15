define(['aeris', 'base/layer'], function(aeris) {

  /**
   * @fileoverview Representation of image tile (xyz) layer.
   */


  aeris.provide('aeris.maps.layers.Tile');


  /**
   * Representation of image tile (xyz) layer.
   *
   * @constructor
   * @extends {aeris.maps.Layers}
   */
  aeris.maps.layers.Tile = function() {


    aeris.maps.Layer.call(this);


    this.strategy.push('Tile');


    /**
     * An array of subdomains to use for load balancing tile requests.
     *
     * @type {Array.<string>}
     */
    this.subdomains = [];


    /**
     * The url for requesting tiles. The url will be interpolated by replacing
     * special variables with calculated values. Special variables should be
     * wrapped with '{' and '}'.
     *
     * * {d} - a randomly selected subdomain
     * * {z} - the calculated zoom factor
     * * {x} - the tile's starting x coordinate
     * * {y} - the tile's starting y coordinate
     * 
     * ex. http://{d}.tileserver.net/{z}/{x}/{y}.png
     *
     * @type {string}
     */
    this.url = null;


    /**
     * The minimum zoom level provided by the tile renderer.
     *
     * @type {numbr}
     */
    this.minZoom = 0;


    /**
     * The maximum zoom level provided by the tile renderer.
     *
     * @type {number}
     */
    this.maxZoom = 22;

  };
  aeris.inherits(aeris.maps.layers.Tile, aeris.maps.Layer);


  /**
   * Implemented map specific zoom factor calculation.
   *
   * @param {number} zoom the map's current zoom level.
   * @return {number}
   */
  aeris.maps.layers.Tile.prototype.zoomFactor = function(zoom) {
    return zoom;
  };


  return aeris.maps.Layer;

});