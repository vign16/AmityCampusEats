import { 
  menuItems, 
  orders, 
  type MenuItem, 
  type InsertMenuItem, 
  type Order, 
  type InsertOrder,
  type User,
  type InsertUser
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Menu items
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  authenticateUser(email: string, password: string): Promise<User | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private orders: Map<number, Order>;
  private users: Map<number, User>;
  private menuItemsCurrentId: number;
  private ordersCurrentId: number;
  private usersCurrentId: number;

  constructor() {
    this.menuItems = new Map();
    this.orders = new Map();
    this.users = new Map();
    this.menuItemsCurrentId = 1;
    this.ordersCurrentId = 1;
    this.usersCurrentId = 1;
    
    // Initialize with predefined menu items
    this.initializeMenuItems();
  }

  // Menu items methods
  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (item) => item.category === category
    );
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  // Orders methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.ordersCurrentId++;
    
    // Set a default status if one isn't provided
    const status = insertOrder.status || "pending";
    
    // Generate a token number if needed (format: YYYYMMDD-XXX where XXX is a sequential number)
    const tokenNumber = insertOrder.tokenNumber || this.generateTokenNumber();
    
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      status,
      userId: insertOrder.userId || null,
      tokenNumber
    };
    
    this.orders.set(id, order);
    return order;
  }
  
  private generateTokenNumber(): string {
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit number
    return `${dateStr}-${randomNum}`;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => 'userId' in order && order.userId === userId
    );
  }

  // Initialize menu items
  private initializeMenuItems() {
    // Breakfast items
    this.addMenuItem({
      name: "Poori",
      price: 40,
      description: "Golden-fried, puffy whole wheat bread served with spicy potato masala. A hearty breakfast staple across India.",
      category: "breakfast",
      imageUrl: "/api/static/poori.png"
    });
    
    this.addMenuItem({
      name: "Dosa",
      price: 50,
      description: "Crispy, golden-brown fermented rice and lentil crepe served with coconut chutney and tangy sambar. South Indian favorite.",
      category: "breakfast",
      imageUrl: "/api/static/dosa.png"
    });
    
    this.addMenuItem({
      name: "Idli",
      price: 30,
      description: "Soft, fluffy steamed rice cakes made from fermented rice and lentil batter. Served with sambar and chutney.",
      category: "breakfast",
      imageUrl: "/api/static/idili.png"
    });
    
    this.addMenuItem({
      name: "Vada",
      price: 20,
      description: "Crispy, donut-shaped savory fritters made from urad dal, flavored with curry leaves, ginger, and chilies. Perfect with chutney.",
      category: "breakfast",
      imageUrl: "/api/static/vada.png"
    });

    // Lunch items
    this.addMenuItem({
      name: "Paneer Palak",
      price: 120,
      description: "Fresh cottage cheese cubes in a creamy, pureed spinach gravy seasoned with aromatic spices. Rich in iron and protein.",
      category: "lunch",
      imageUrl: "/api/static/paneer palak.png"
    });
    
    this.addMenuItem({
      name: "Chapati",
      price: 40,
      description: "Soft, whole wheat flatbread roasted on a tawa. The perfect accompaniment for curries and dals.",
      category: "lunch",
      imageUrl: "/api/static/chapathi.png"
    });
    
    this.addMenuItem({
      name: "South Meals",
      price: 150,
      description: "A complete balanced meal with rice, sambar, rasam, vegetable curries, curd, pickle, and papadam served on a traditional banana leaf.",
      category: "lunch",
      imageUrl: "/api/static/south meals.png"
    });
    
    this.addMenuItem({
      name: "North Meals",
      price: 170,
      description: "Wholesome thali with rotis, dal, vegetable curry, rice, pickle, and a sweet dish. A perfect representation of North Indian cuisine.",
      category: "lunch",
      imageUrl: "/api/static/north meals.png"
    });
    
    this.addMenuItem({
      name: "Noodles",
      price: 80,
      description: "Stir-fried noodles with mixed vegetables in a spicy Indo-Chinese sauce, topped with spring onions.",
      category: "lunch",
      imageUrl: "/api/static/noodles.png"
    });
    
    this.addMenuItem({
      name: "Gobi Manchurian",
      price: 90,
      description: "Crispy cauliflower florets tossed in a tangy, spicy Manchurian sauce. A popular Indo-Chinese delicacy.",
      category: "lunch",
      imageUrl: "/api/static/gobi manchi.jpg"
    });

    // Snacks items
    this.addMenuItem({
      name: "Samosa",
      price: 15,
      description: "Triangle-shaped pastries filled with spiced potatoes, peas, and aromatic spices. Served with mint and tamarind chutneys.",
      category: "snacks",
      imageUrl: "/api/static/samosa.jpg"
    });
    
    this.addMenuItem({
      name: "Rasgulla",
      price: 20,
      description: "Soft, spongy cheese balls soaked in light sugar syrup. A melt-in-mouth Bengali sweet treat.",
      category: "snacks",
      imageUrl: "/api/static/rasagulla.jpg"
    });
    
    this.addMenuItem({
      name: "Puffs",
      price: 25,
      description: "Flaky, layered pastry filled with spicy vegetable or paneer stuffing. Perfect tea-time snack.",
      category: "snacks",
      imageUrl: "/api/static/puff.jpg"
    });
    
    this.addMenuItem({
      name: "Cornflakes",
      price: 30,
      description: "Crunchy cornflakes served with cold milk and topped with fresh seasonal fruits and honey.",
      category: "snacks",
      imageUrl: "/api/static/cornflakes.webp"
    });
  }

  private addMenuItem(item: InsertMenuItem): void {
    const id = this.menuItemsCurrentId++;
    this.menuItems.set(id, { ...item, id });
  }

  // Users methods
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.usersCurrentId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async authenticateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByEmail(email);
    if (!user) return undefined;
    
    // In a real application, you would hash and compare passwords
    // For simplicity, we're comparing plain text passwords
    return user.password === password ? user : undefined;
  }
}

export const storage = new MemStorage();
