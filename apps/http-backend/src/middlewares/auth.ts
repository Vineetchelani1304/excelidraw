// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// export const auth = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ message: "No token provided" });
//         }
//         const secret = process.env.JWT_SECRET || "mysecret";
//         const decoded = jwt.verify(token, secret);
//         if(decoded){
//             // @ts-ignore
//             req.userId = decoded.id;
//             next();
//         }
//         else{
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//     }
//     catch (error) {
//         return res.status(500).json({ message: "i don't know what to do", error: error });        
//     }
// }

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extending the Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
    res.status(401).json({ message: "No token provided" });
    return
    }

    const secret = process.env.JWT_SECRET || "mysecret";
    const decoded = jwt.verify(token, secret) as { id: string }; // type cast the decoded token

    if (decoded) {
      req.userId = decoded.id; // Attach the userId to the request
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(401).json({ message: "Unauthorized" });
      return 
    }
  } catch (error) {
    res.status(500).json({
      message: "Token validation failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return 
  }
};
