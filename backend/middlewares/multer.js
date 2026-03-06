import multer from "multer";

const storage = multer.memoryStorage(); // File ko RAM mein rakhega, disk par nahi
export const singleUpload = multer({ storage }).single("file");