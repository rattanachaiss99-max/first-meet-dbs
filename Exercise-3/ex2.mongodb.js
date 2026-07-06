use("sample_mflix")
db.theaters.find({ "location.address.city": "Oxford" }).count()