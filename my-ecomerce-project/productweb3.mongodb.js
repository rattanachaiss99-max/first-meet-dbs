use("web3_commerce_db");

// ลบข้อมูลสินค้าเก่าทิ้งก่อน
db.products.deleteMany({});

// 1. กำหนด ID จริงของ Product และ Store (ต้องเป็นเลขเดียวกันกับที่ใช้ในตาราง Users)
const REAL_STORE_ID = ObjectId("668c12300000000000000001");
const REAL_PRODUCT_ID = ObjectId("668c12300000000000000002");

// 2. ทำการ Insert ข้อมูล Product
db.products.insertOne({
  // ----------------------------------------------------
  // แก้ไข 1: กำหนด _id เป็นค่าคงที่ เพื่อให้ Users/Orders อ้างอิงได้
  // ----------------------------------------------------
  _id: REAL_PRODUCT_ID, 
  
  // ----------------------------------------------------
  // แก้ไข 2: ใช้ตัวแปร Store ID แทนการใช้เลขสุ่ม
  // ----------------------------------------------------
  store_id: REAL_STORE_ID, 
  
  sku: "TSHIRT-BLK-M",
  name: "เสื้อยืดสไตล์มินิมอล สีดำ",
  slug: "minimalist-tshirt-black",
  description: "<p>เสื้อยืดคอตตอน 100% สวมใส่สบาย ระบายอากาศได้ดี...</p>",
  pricing: {
    base_price: 350.00,
    discount_price: 299.00,
    currency: "THB"
  },
  inventory: {
    stock_quantity: 45,
    is_in_stock: true,
    reserved_quantity: 2
  },
  media: [
    {
      url: "https://cdn.shorthub.com/images/products/tshirt-blk-1.jpg",
      alt_text: "ด้านหน้า",
      is_primary: true
    },
    {
      url: "https://cdn.shorthub.com/images/products/tshirt-blk-2.jpg",
      alt_text: "ด้านหลัง",
      is_primary: false
    }
  ],
  categories: ["Men", "Clothing", "T-Shirts"],
  tags: ["minimal", "cotton", "black", "summer"],
  variants: [
    {
      name: "Size",
      options: ["S", "M", "L", "XL"]
    }
  ],
  metrics: {
    view_count: 1240,
    sales_count: 89,
    average_rating: 4.8,
    total_reviews: 15
  },
  status: "ACTIVE",
  created_at: ISODate("2026-06-01T10:00:00Z"),
  updated_at: ISODate("2026-07-08T12:00:00Z")
});

console.log("เพิ่มข้อมูล Product (ที่มี ID คงที่) สำเร็จแล้ว!");

db.products.find({});

//View-Count
// db.products.updateOne(
//   { sku: "TSHIRT-BLK-M" },
//   { 
//     $inc: { "metrics.view_count": 1 } 
//   }
// );

//Purchase-Complete
// db.products.updateOne(
//   { sku: "TSHIRT-BLK-M" },
//   { 
//     $inc: { 
//       "inventory.stock_quantity": -1,  // ลดสต๊อกลง 1 ตัว
//       "metrics.sales_count": 1         // เพิ่มยอดขาย 1 ครั้ง
//     },
//     $set: { "updated_at": new Date() } // อัปเดตเวลาล่าสุด
//   }
// );

//Edit-Price
// db.products.updateOne(
//   { sku: "TSHIRT-BLK-M" },
//   {
//     $set: { 
//       "pricing.discount_price": 250.00,
//       "updated_at": new Date()
//     }
//   }
// );

//Query
// db.products.find({
//   status: "ACTIVE",
//   categories: "T-Shirts", // MongoDB ฉลาดพอที่จะค้นหาใน Array ให้เอง
//   "inventory.stock_quantity": { $gt: 0 } // $gt ย่อมาจาก Greater Than (มากกว่า 0)
// });

//findTag
// db.products.find({
//   status: "ACTIVE",
//   tags: { $all: ["minimal", "black"] } // ต้องมีทั้งสองคำนี้ใน Array
// });