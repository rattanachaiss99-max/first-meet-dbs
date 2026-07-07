use("chrome-burger-db");
//cleardata
db.suppliers.deleteMany({});

//Insert mock data
db.suppliers.insertMany([
    {
        "_id": ObjectId("65f000000000000000000001"),
        "name": "Patty's Premium Meats",
        "contact_person": "Patty Smith",
        "phone_number": "555-0101"
    },
    {
        "_id": ObjectId("65f000000000000000000002"),
        "name": "The Bun Barn",
        "contact_person": "Brad Breadson",
        "phone_number": "555-0102"
    },
    {
        "_id": ObjectId("65f000000000000000000003"),
        "name": "Freshest Farm Produce",
        "contact_person": "Frank Farmer",
        "phone_number": "555-0103"
    }
]);
//Find
db.suppliers.find({});