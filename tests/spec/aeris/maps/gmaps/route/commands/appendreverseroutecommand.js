define([
  'aeris/util',
  'gmaps/route/commands/appendreverseroutecommand',
  'gmaps/route/route',
  'gmaps/route/waypoint'
], function(_, AppendReverseRouteCommand, Route, Waypoint) {

  var MockRoute = function() {
    var methods = [
      'getWaypoints',
      'has',
      'add',
      'set'
    ];

    _.extend(this, jasmine.createSpyObj('route', methods));

    this.setStubbedWaypoints([]);
  };
  _.inherits(MockRoute, Route);


  MockRoute.prototype.setStubbedWaypoints = function(waypoints) {
    this.getWaypoints.andReturn(waypoints);

    this.has.andCallFake(function(wp) {
      return !!waypoints.indexOf(wp);
    });
  };


  var MockWaypoint = function() {
    var methods = [
      'destroy'
    ];
    _.extend(this, jasmine.createSpyObj('MockWaypoint', methods));
  };
  _.inherits(MockWaypoint, Waypoint)


  var MockRouteReverser = function() {
    var methods = [
      'getWaypointInReverse',
      'getRouteWaypointsInReverse'
    ];

    _.extend(this, jasmine.createSpyObj('routeReverser', methods));

    this.getRouteWaypointsInReverse.andReturn([]);
  };



  describe('An AppendReverseRouteCommand', function() {

    describe('execute', function() {
      var command;
      var route;
      var reverser;


      beforeEach(function() {
        reverser = new MockRouteReverser();
        route = new MockRoute();
        command = new AppendReverseRouteCommand(route, {
          routeReverser: reverser
        });
      });


      it('should add reversed waypoints onto the route, omitting the first reversed waypoint', function() {
        var pointC = new MockWaypoint(), pointB = new MockWaypoint(), pointA = new MockWaypoint();
        var reverseWaypoints = [pointC, pointB, pointA];
        reverser.getRouteWaypointsInReverse.andReturn(reverseWaypoints);

        command.execute();

        expect(route.add).toHaveBeenCalledWith([pointB, pointA]);
      });

      it('should destroy the first reversed waypoint', function() {
        var firstReversedWaypoint = new MockWaypoint();
        var reverseWaypoints = [firstReversedWaypoint, 'pointB', 'pointA'];
        reverser.getRouteWaypointsInReverse.andReturn(reverseWaypoints);

        command.execute();

        expect(firstReversedWaypoint.destroy).toHaveBeenCalled();
      });

    });


    describe('undo', function() {
      var command;
      var route;
      var reverser;


      beforeEach(function() {
        reverser = new MockRouteReverser();
        route = new MockRoute();
        command = new AppendReverseRouteCommand(route, {
          routeReverser: reverser
        });
      });

      it('should remove the appended waypoints', function() {
        var wpA = new MockWaypoint(), wpB = new MockWaypoint(), wpC = new MockWaypoint();
        var wpA_reverse = new MockWaypoint(), wpB_reverse = new MockWaypoint(), wpC_reverse = new MockWaypoint();
        var waypointsOrig = [wpA, wpB, wpC];

        route.setStubbedWaypoints(waypointsOrig);
        reverser.getRouteWaypointsInReverse.andReturn([wpC_reverse, wpB_reverse, wpA_reverse]);

        command.execute();
        route.setStubbedWaypoints([
          wpA, wpB, wpC, wpA_reverse, wpB_reverse
        ]);

        command.undo();
        expect(route.set).toHaveBeenCalledWith([
          wpA, wpB, wpC
        ])
      });

    });

  });

});
