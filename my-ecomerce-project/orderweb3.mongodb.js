use("web3_commerce_db");

// ลบข้อมูลออเดอร์เก่าทิ้งก่อน
db.orders.deleteMany({});

// 1. นำ ID ของ Store, Product และ User ที่เราใช้ใน 2 สคริปต์ก่อนหน้านี้มาใช้ต่อ
const REAL_STORE_ID = ObjectId("668c12300000000000000001");
const REAL_PRODUCT_ID = ObjectId("668c12300000000000000002");
const REAL_USER_ID = ObjectId("668c12300000000000000003");

// (ตัวเลือกเสริม: สร้าง ID จำลองสำหรับตารางประวัติแต้ม Loyalty)
const REAL_LOYALTY_TXN_ID = ObjectId("668c12300000000000000004");

// 2. ทำการ Insert ข้อมูล Order
db.orders.insertOne({
  order_number: "ORD-20260708-A9B8",

  user_id: REAL_USER_ID,
  store_id: REAL_STORE_ID,
  
  items: [
    {
      product_id: REAL_PRODUCT_ID,
      sku: "TSHIRT-BLK-M",
      name: "เสื้อยืดสไตล์มินิมอล สีดำ",
      variant: "Size: M",
      quantity: 2,
      unit_price: 299.00,
      subtotal: 598.00
    }
  ],
  payment: {
    items_total: 598.00,
    shipping_fee: 45.00,
    discount_amount: 50.00,
    net_total: 593.00,
    method: "PROMPTPAY",
    transaction_id: "TXN-0987654321",
    status: "PAID"
  },
  shipping_address: {
    full_name: "สมชาย ใจดี",
    phone: "081-234-5678",
    address_line1: "123/45 ถนนสุขุมวิท",
    sub_district: "คลองเตย",
    district: "คลองเตย",
    province: "กรุงเทพมหานคร",
    postal_code: "10110"
  },
  loyalty: {
    points_earned: 59,
    points_used: 500,
    // ----------------------------------------------------
    // แก้ไข 3: ใช้ตัวแปรแทนเลขสุ่ม
    // ----------------------------------------------------
    post_reference_id: REAL_LOYALTY_TXN_ID
  },
  order_status: "PROCESSING",
  tracking: {
    courier: "KERRY",
    tracking_number: "KER123456789TH",
    shipped_at: ISODate("2026-07-09T08:30:00Z")
  },
  created_at: ISODate("2026-07-08T10:00:00Z"),
  updated_at: ISODate("2026-07-08T10:05:00Z")
});

console.log("เพิ่มข้อมูล Order ที่ผูกกับ User, Store และ Product เรียบร้อยแล้ว!");

//FindAll
//db.orders.find({});

//Update-order-status
// db.orders.updateOne(
//   { order_number: "ORD-20260708-A9B8" },
//   {
//     $set: {
//       "order_status": "SHIPPED",
//       "tracking.courier": "FLASH",
//       "tracking.tracking_number": "FLS987654321TH",
//       "tracking.shipped_at": new Date(),
//       "updated_at": new Date()
//     }
//   }
// );

//Order-history
// db.orders.find(
//   { user_id: ObjectId("64f1b2c3123abc456def9999") }
// ).sort({ created_at: -1 });

//pending-Order
// db.orders.find({
//   "payment.status": "PAID",
//   "order_status": "PROCESSING"
// });

//summarize-storeID
// db.orders.aggregate([
//   {
//     $match: {
//       store_id: ObjectId("64f3d4e5123abc456def7777"),
//       "payment.status": "PAID", // นับเฉพาะที่จ่ายเงินแล้ว
//       created_at: {
//         $gte: ISODate("2026-07-01T00:00:00Z"),
//         $lt: ISODate("2026-08-01T00:00:00Z")
//       }
//     }
//   },
//   {
//     $group: {
//       _id: null,
//       total_revenue: { $sum: "$payment.net_total" }, // รวมยอดเงิน
//       total_orders: { $sum: 1 } // นับจำนวนออเดอร์
//     }
//   }
// ]);