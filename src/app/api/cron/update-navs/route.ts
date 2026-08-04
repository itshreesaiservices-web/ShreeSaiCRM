import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This is the official open data URL for Indian Mutual Funds provided by AMFI
const AMFI_NAV_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

export async function GET(request: Request) {
  try {
    // 1. In a production environment like Vercel, you should protect this route
    // so only your Cron job can trigger it, usually via an Authorization header.
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch the live data from AMFI
    const response = await fetch(AMFI_NAV_URL);
    const textData = await response.text();

    // 3. Parse the semicolon-separated text file
    const lines = textData.split("\n");
    const navUpdates = [];

    // Skip the headers and parse the data
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.includes(";") === false) continue; // Skip category headers or empty lines

      // AMFI Format: SchemeCode; ISIN; ISIN; SchemeName; NAV; Date
      const parts = line.split(";");
      if (parts.length >= 6) {
        const schemeName = parts[3];
        const nav = parseFloat(parts[4]);
        
        // Parse date from DD-MMM-YYYY to JS Date
        const dateStr = parts[5]; 
        const date = new Date(dateStr);

        if (!isNaN(nav)) {
          navUpdates.push({ schemeName, nav, date });
        }
      }
    }

    // 4. Update our database
    // In a real application, you would match by AMFI Scheme Code.
    // For this demonstration, we will attempt to match by the exact Scheme Name.
    let updatedCount = 0;

    // Fetch all active schemes in our database
    const ourSchemes = await prisma.mutualFundScheme.findMany();

    for (const ourScheme of ourSchemes) {
      // Find the matching live data
      const liveData = navUpdates.find(
        (update) => update.schemeName.toLowerCase() === ourScheme.schemeName.toLowerCase()
      );

      if (liveData) {
        // Update the NAV in our database!
        await prisma.mutualFundScheme.update({
          where: { id: ourScheme.id },
          data: {
            currentNav: liveData.nav,
            navDate: liveData.date,
          },
        });
        updatedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully synced live data. Updated ${updatedCount} mutual funds.`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: "Failed to sync NAV data" }, { status: 500 });
  }
}
