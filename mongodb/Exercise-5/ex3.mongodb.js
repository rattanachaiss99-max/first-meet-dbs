use("sample_mflix")
db.movies.find({ year: { $gt: 1954, $lt: 1966 } }).sort({ year: 1 }).limit(3)