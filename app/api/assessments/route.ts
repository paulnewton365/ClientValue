import { NextResponse } from 'next/server';
import smartsheetClient from 'smartsheet';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SHEET_ID = process.env.SMARTSHEET_SHEET_ID!;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    }

    const ss = smartsheetClient.createClient({
      accessToken: process.env.SMARTSHEET_ACCESS_TOKEN!,
    });

    const sheet = await ss.sheets.getSheet({ id: SHEET_ID });
    const colByTitle = new Map<string, number>();
    const titleByCol = new Map<number, string>();
    for (const c of sheet.columns) {
      colByTitle.set(c.title, c.id);
      titleByCol.set(c.id, c.title);
    }

    const getCell = (row: any, title: string) => {
      const colId = colByTitle.get(title);
      if (!colId) return null;
      const cell = row.cells.find((c: any) => c.columnId === colId);
      if (!cell) return null;
      return cell.value ?? cell.displayValue ?? null;
    };

    const assessments = (sheet.rows || []).map((row: any) => {
      return {
        rowId: row.id,
        clientName: getCell(row, 'Client Name') || '',
        analysisDate: getCell(row, 'Analysis Date') || '',
        archetype: getCell(row, 'Predicted Archetype') || '',
        confidence: getCell(row, 'Confidence Level') || '',
        submittedBy: getCell(row, 'Submitted By') || '',
        workType: getCell(row, 'Work Type') || '',
        reviewStatus: getCell(row, 'Review Status') || '',
        createdAt: row.createdAt,
      };
    });

    // Sort newest first
    assessments.sort((a: any, b: any) => {
      const da = new Date(a.createdAt || a.analysisDate || 0).getTime();
      const db = new Date(b.createdAt || b.analysisDate || 0).getTime();
      return db - da;
    });

    return NextResponse.json({
      assessments,
      sheetUrl: `https://app.smartsheet.com/sheets/${SHEET_ID}`,
    });
  } catch (err: any) {
    console.error('Assessments list error:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Failed to fetch assessments.' },
      { status: 500 }
    );
  }
}
