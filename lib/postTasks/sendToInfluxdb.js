/**
 * Sitespeed.io - How speedy is your site? (http://www.sitespeed.io)
 * Copyright (c) 2014, Peter Hedenskog, Tobias Lidskog
 * and other contributors
 * Released under the Apache 2.0 License
 */
'use strict';
var InfluxdbSender = require('../influxdb/influxdbSender'),
InfluxdbCollector = require('../influxdb/influxdbCollector');

exports.task = function(result, config, cb) {
  if (config.influxdbHost) {

    var sender = new InfluxdbSender(config.influxdbHost, config.influxdbPort, config);
    var collector = new InfluxdbCollector(config);

    var statistics = collector.collect(result.aggregates, result.pages, result.domains);
    sender.send(statistics, cb);
  } else {
    cb();
  }

};