import mongoose from "mongoose";
import admin from "firebase-admin";
import serviceAccount from "./credentials.json" assert { type: "json" };
import MongoDAO from "../DAOs/mongoDAOs.js";
import FirebaseDAO from "../DAOs/firebaseDAOs.js";
import ArchivoDAO from "../DAOs/archivoDAOs.js";
import MemoriaDAO from "../DAOs/memoriaDAOs.js";

let isConnected;
let dbDAO;

const connectToFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coff-fe-default-rtdb.firebaseio.com",
  });
};

const connectToDb = async (db) => {
  if (!isConnected) {
    try {
      switch (db) {
        case "mongo":
          await mongoose.connect("mongodb://127.0.0.1:27017/Coff-fe");
          dbDAO = new MongoDAO();
          break;
        case "firebase":
          connectToFirebase();
          dbDAO = new FirebaseDAO();
          break;
        case "archivo":
          dbDAO = new ArchivoDAO();
          break;
        case "memoria":
          dbDAO = new MemoriaDAO();
          break;
      }

      isConnected = true;
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  return;
};

export { connectToDb, dbDAO };
