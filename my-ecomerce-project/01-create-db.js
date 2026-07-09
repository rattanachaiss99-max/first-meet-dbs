const database = 'web3_commerce_db';

const usersCollection = 'users';
const productsCollection = 'products';
const ordersCollection = 'orders';
const storesCollection = 'stores';

use(database);

db.getCollection(usersCollection).drop();
db.getCollection(productsCollection).drop();
db.getCollection(ordersCollection).drop();
db.getCollection(storesCollection).drop();

// สร้าง Collections ใหม่
db.createCollection(usersCollection);
db.createCollection(productsCollection);
db.createCollection(ordersCollection);
db.createCollection(storesCollection);

console.log(`✅ เตรียม Database และ Collections เรียบร้อยแล้ว`);

// =================================================================
// 2. กำหนด ObjectId ล่วงหน้า เพื่อให้ข้อมูลทุกตารางลิงก์หากันเจอจริงๆ
// =================================================================
const REAL_STORE_ID = ObjectId("668c12300000000000000001");
const REAL_PRODUCT_ID = ObjectId("668c12300000000000000002");
const REAL_USER_ID = ObjectId("668c12300000000000000003");

// =================================================================
// 3. เริ่ม Insert ข้อมูลที่เกี่ยวข้องกัน
// =================================================================

// 3.1 สร้างร้านค้า (Store)
db.getCollection(storesCollection).insertOne({
  _id: REAL_STORE_ID,
  name: "Minimalist Official Store",
  description: "ร้านขายเสื้อผ้าสไตล์มินิมอลของแท้",
  created_at: new Date()
});

// 3.2 สร้างสินค้า (Product) สังกัดร้านค้าด้านบน
db.getCollection(productsCollection).insertOne({
  _id: REAL_PRODUCT_ID,
  store_id: REAL_STORE_ID, // ลิงก์ไปหา Store
  sku: "TSHIRT-BLK-M",
  name: "เสื้อยืดสไตล์มินิมอล สีดำ (Size M)",
  description: "เสื้อยืดคอตตอน 100% สวมใส่สบาย",
  pricing: { 
    base_price: 350.00, 
    discount_price: 299.00,
    currency: "THB"
  },
  inventory: { 
    stock_quantity: 45, 
    is_in_stock: true 
  },
  status: "ACTIVE",
  created_at: new Date()
});

// 3.3 สร้างผู้ใช้ (User) พร้อมใส่สินค้าด้านบนลงในตะกร้า
db.getCollection(usersCollection).insertOne({
  _id: REAL_USER_ID,
  wallet_address: "0x123abc456def9999",
  email: "somchai@example.com",
  display_name: "Somchai Shopper",
  role: "USER",
  loyalty: {
    tier: "GOLD",
    current_points: 1250
  },
  shipping_addresses: [
    {
      is_default: true,
      full_name: "สมชาย ใจดี",
      phone: "081-234-5678",
      address_line1: "123/45 ถนนสุขุมวิท",
      province: "กรุงเทพมหานคร",
      postal_code: "10110"
    }
  ],
  cart: {
    items: [
      {
        product_id: REAL_PRODUCT_ID, // ลิงก์ไปหา Product
        store_id: REAL_STORE_ID,     // ลิงก์ไปหา Store
        quantity: 2,
        added_at: new Date()
      }
    ],
    last_updated: new Date()
  },
  created_at: new Date()
});

// 3.4 สร้างคำสั่งซื้อ (Order) ที่ผูกทุกอย่างเข้าด้วยกัน
db.getCollection(ordersCollection).insertOne({
  order_number: "ORD-TEST-001",
  user_id: REAL_USER_ID,       // ลิงก์ไปหา User
  store_id: REAL_STORE_ID,     // ลิงก์ไปหา Store
  items: [
    {
      product_id: REAL_PRODUCT_ID, // ลิงก์ไปหา Product
      sku: "TSHIRT-BLK-M",
      name: "เสื้อยืดสไตล์มินิมอล สีดำ (Size M)",
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
    status: "PAID" 
  },
  shipping_address: {
    full_name: "สมชาย ใจดี",
    phone: "081-234-5678",
    address_line1: "123/45 ถนนสุขุมวิท",
    province: "กรุงเทพมหานคร",
    postal_code: "10110"
  },
  order_status: "PROCESSING",
  created_at: new Date()
});

console.log(`✅ Insert ข้อมูล Store, Product, User และ Order ที่มีความสัมพันธ์กัน (Relational) เสร็จสมบูรณ์แล้ว!`);