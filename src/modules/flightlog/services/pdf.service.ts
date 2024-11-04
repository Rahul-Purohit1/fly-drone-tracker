import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateFlightLogDto } from "../dto/create-flightlog.dto";
import * as PDFDocument from 'pdfkit'


@Injectable()
export class PdfService {
    async createPdfForFlightLog(flightLog: CreateFlightLogDto): Promise<Buffer> {
        try {

            const pdfDoc = new PDFDocument();
            const buffers: Buffer[] = [];

            pdfDoc.on('data', (chunk: Buffer) => buffers.push(chunk));

            // PDF Title and Basic Info
            pdfDoc.fontSize(18).text(`Flight Log Report for Flight ID: ${flightLog.flight_id}`, { align: 'center' });
            pdfDoc.moveDown();

            pdfDoc.fontSize(12).text(`Drone Information: ${flightLog.drone_id}`);
            pdfDoc.text(`Mission Name: ${flightLog.mission_name}`);
            pdfDoc.text(`Speed: ${flightLog.speed} m/s`);
            pdfDoc.text(`Total Distance: ${flightLog.distance} meters`);
            pdfDoc.text(`Execution Start: ${flightLog.execution_start}`);
            pdfDoc.text(`Execution End: ${flightLog.execution_end}`);
            pdfDoc.moveDown();

            // Table Header for Waypoints
            pdfDoc.fontSize(14).text('Waypoints:', { underline: true });
            pdfDoc.fontSize(10).text('Time (s)   |   Latitude   |   Longitude   |   Altitude', { underline: true });
            pdfDoc.moveDown(0.5);
            // Table Rows for Each Waypoint
            flightLog.waypoints.forEach((waypoint) => {
                pdfDoc.text(`${waypoint.time}s   |   ${waypoint.lat.toFixed(6)}   |   ${waypoint.lng.toFixed(6)}   |   ${waypoint.alt}`);
            });


            pdfDoc.end();

            return new Promise((resolve) => {
                pdfDoc.on('end', () => {
                    const pdfbuffer = Buffer.concat(buffers);
                    resolve(pdfbuffer);
                })
            })
        } catch (error) {
            console.log('pdfService createPdfForFlightLog', error);
            throw new InternalServerErrorException('Failed to Generate flight logs PDF');
        }

    }
}