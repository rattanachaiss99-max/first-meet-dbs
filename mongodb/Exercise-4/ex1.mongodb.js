use("sample_mflix")
db.movies.find({ plot: { $regex: "God", $options: "i" } }).count()
