import express, { Express } from "express";
import session from "express-session";
import memorystore from "memorystore";
import { storage } from "./storage";
import { User } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { insertUserSchema } from "@shared/schema";

// Extend session to include user ID
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const MemoryStore = memorystore(session);

// Set up session middleware
export function setupAuth(app: Express) {
  // Configure session middleware
  app.use(
    session({
      secret: "amitycampuseats-secret-key", // In production, use an environment variable for this
      resave: false,
      saveUninitialized: false, 
      cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax', // Helps with CSRF protection
      },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );
  
  // Log session middleware to ensure it's working
  app.use((req, res, next) => {
    console.log('Session middleware:', req.session);
    next();
  });

  // User Registration
  app.post("/api/register", async (req, res) => {
    try {
      // Validate user data
      const userResult = insertUserSchema.safeParse(req.body);
      
      if (!userResult.success) {
        const errorMessage = fromZodError(userResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }

      // Check if user with this email already exists
      const existingUser = await storage.getUserByEmail(userResult.data.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      // Create the user
      const user = await storage.createUser(userResult.data);

      // Store user info in session
      if (req.session) {
        req.session.userId = user.id;
      }

      // Don't send the password back to the client
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // User Login
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Authenticate user
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Store user info in session
      if (req.session) {
        req.session.userId = user.id;
      }

      // Don't send the password back to the client
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });
  
  // User Logout
  app.post("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logged out successfully" });
      });
    } else {
      res.status(200).json({ message: "Not logged in" });
    }
  });

  // Get current user information
  app.get("/api/user", async (req, res) => {
    try {
      // Get user ID from session
      const userId = req.session?.userId;
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send the password back to the client
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}