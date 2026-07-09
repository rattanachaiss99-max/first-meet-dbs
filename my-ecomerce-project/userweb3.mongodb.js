use("web3_commerce_db");

// ลบข้อมูล user เก่าทั้งหมดทิ้งก่อน
db.users.deleteMany({});

const REAL_STORE_ID = ObjectId("668c12300000000000000001");
const REAL_PRODUCT_ID = ObjectId("668c12300000000000000002");
const REAL_USER_ID = ObjectId("668c12300000000000000003"); 

db.users.insertOne({
  _id: REAL_USER_ID,
  wallet_address: "0x123abc456def...",
  email: "user@example.com",
  display_name: "Shopper Web3",
  role: "USER",
  loyalty: {
    tier: "GOLD",
    current_points: 1250,
    lifetime_points: 5000
  },
  shipping_addresses: [
    {
      is_default: true,
      full_name: "สมชาย ใจดี",
      phone: "081-234-5678",
      address_line1: "123/45 ถนนสุขุมวิท",
      sub_district: "คลองเตย",
      district: "คลองเตย",
      province: "กรุงเทพมหานคร",
      postal_code: "10110"
    }
  ],
  cart: {
    items: [
      {
        product_id: REAL_PRODUCT_ID, 
        store_id: REAL_STORE_ID,
        quantity: 2,
        added_at: ISODate("2026-07-08T10:00:00Z")
      }
    ],
    last_updated: ISODate("2026-07-08T10:00:00Z")
  },
  created_at: ISODate("2026-01-15T08:30:00Z"),
  updated_at: ISODate("2026-07-08T10:00:00Z")
});

console.log("เพิ่มข้อมูล User ที่เชื่อมโยงกับ Product/Store สำเร็จแล้ว!");

//findAll
db.users.find({});

//User-Update-Address
// db.users.updateOne(
//   { email: "user@example.com" }, 
//   {
//     $push: {
//       shipping_addresses: {
//         is_default: false,
//         full_name: "สมชาย ใจดี (ที่ทำงาน)",
//         phone: "081-234-5678",
//         address_line1: "999 อาคารออฟฟิศ...",
//         province: "กรุงเทพมหานคร",
//         postal_code: "10120"
//       }
//     }
//   }
// );

//User-Add-Cart
// db.users.updateOne(
//   { email: "user@example.com" },
//   {
//     $push: {
//       "cart.items": {
//         product_id: ObjectId("507f..."),
//         store_id: ObjectId("507f..."),
//         quantity: 1,
//         added_at: new Date()
//       }
//     },
//     $set: { "cart.last_updated": new Date() }
//   }
// );

//Add-Point
// db.users.updateOne(
//   { email: "user@example.com" },
//   {
//     $inc: { 
//       "loyalty.current_points": 50, 
//       "loyalty.lifetime_points": 50 
//     }
//   }
// );
