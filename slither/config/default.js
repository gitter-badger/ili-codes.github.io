module.exports = {
  'env': 'dev',
  'port': process.env.PORT || 1337,
  'origins': ['http://localhost:1337', 'http://slither.io'],
  'max-connections': 1000,
  'logfile': 'slither.log',
  'food-colors': 23,
  'food-size': [35, 70],
  'start-food': 22000,
  'map-size': 216000,
};
