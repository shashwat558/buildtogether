import { PrismaClient } from "@prisma/client";
import fs from "fs";
import Papa from "papaparse";
import path from "path";


const prisma = new PrismaClient()

const seedColleges = async () => {
    try {
        const csvFilePath = path.join(process.cwd(), "/colleges.csv");
        const csvData = fs.readFileSync(csvFilePath, "utf-8");
        const parsedData = Papa.parse(csvData, {
            header: false,
            skipEmptyLines: true
        });


        const colleges = parsedData.data.map((row) => ({
            name:row[0]?.trim(),
            city: row[1]?.trim() ?? "unknown city"
        }));

        console.log(`Seeding ${colleges.length} colleges into the database`);


        await prisma.college.createMany({
            data: colleges,
            skipDuplicates: true
        })
        console.log("done")
        
    } catch (error) {
        console.log(error)
        
    }
}

seedColleges();