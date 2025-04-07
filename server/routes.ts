import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import path from "path";
import express from "express";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files
  app.use('/api/static', express.static(path.join(process.cwd(), 'attached_assets')));
  
  // Set up authentication
  setupAuth(app);
  // Get all menu items
  app.get("/api/menu-items", async (req: Request, res: Response) => {
    try {
      const menuItems = await storage.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  // Get menu items by category
  app.get("/api/menu-items/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const menuItems = await storage.getMenuItemsByCategory(category);
      res.json(menuItems);
    } catch (error) {
      console.error(`Error fetching menu items for category ${req.params.category}:`, error);
      res.status(500).json({ message: "Failed to fetch menu items by category" });
    }
  });

  // Get a single menu item by ID
  app.get("/api/menu-item/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid menu item ID" });
      }

      const menuItem = await storage.getMenuItem(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      res.json(menuItem);
    } catch (error) {
      console.error(`Error fetching menu item ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Create a new order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const orderResult = insertOrderSchema.safeParse(req.body);
      
      if (!orderResult.success) {
        const errorMessage = fromZodError(orderResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }

      const order = await storage.createOrder(orderResult.data);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get an order by ID
  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      console.error(`Error fetching order ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  
  // Get orders by user ID
  app.get("/api/user/:userId/orders", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const orders = await storage.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      console.error(`Error fetching orders for user ${req.params.userId}:`, error);
      res.status(500).json({ message: "Failed to fetch user orders" });
    }
  });

  // Update order status
  app.patch("/api/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }

      const updatedOrder = await storage.updateOrderStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(updatedOrder);
    } catch (error) {
      console.error(`Error updating order status for ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Auth routes are now handled by setupAuth in auth.ts

  const httpServer = createServer(app);
  return httpServer;
}
