use("sample_mflix")
db.movies.find({ 
  title: { $regex: /^the matrix$/i } 
});