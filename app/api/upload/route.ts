import {  NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const items = fs.readdirSync(publicDir, { withFileTypes: true });

    // Filter for directories only, excluding certain system directories
    const categories = items
      .filter((item) => item.isDirectory())
      .map((item) => item.name)
      .filter((name) => !name.startsWith(".") && name !== "images");

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json({ categories: [] });
  }
}

export async function POST() {
  try {
    // Handle file uploads here if needed
    // const formData = await request.formData();
    // Implementation for file upload logic would go here

    return NextResponse.json({ success: true, message: "Upload successful" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
