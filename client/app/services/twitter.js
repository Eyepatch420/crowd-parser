'use strict';

angular.module('parserApp.twitterService', [])

.factory('Twitter', function ($http, $window) {

  // ========== Setup =============== //

  var socket = $window.io();

  var getTweetsForKeyword = function(keyword, cb) {
    $http.get('/database/getTweetsForKeyword')
      .success(function(data) {
        cb(data);
      });
  };

  var getTwitterRestSearch = function(query) {
    socket.emit('twitter rest search', query, 'mixed', 100);
  };

  var getTweetsCount = function(callback) {
    $http.get('/statistics/getTweetsCount')
      .success(function(data) {

      callback(data[0].id);
    });
  };

  return {
    socket: socket,

    getTweetsForKeyword: getTweetsForKeyword,

    getTwitterRestSearch: getTwitterRestSearch,

    getTweetsCount: getTweetsCount

  };
});