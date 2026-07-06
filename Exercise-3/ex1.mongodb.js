use("sample_mflix")

db.theaters.find({ "location.address.state": "AL" }).count()