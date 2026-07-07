use("sample_mflix")
db.movies.find({ plot: { $regex: "doctor", $options: "i" } })
