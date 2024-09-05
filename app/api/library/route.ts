import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: '검색어를 입력해주세요.' }, { status: 400 });
  }

  try {
    // CSV 파일 경로 (public/data 폴더에 있음)
    const filePath = path.join(process.cwd(), 'public', 'data', 'libraries.csv');
    
    // CSV 파일 읽기
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // CSV 파싱
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    // 도서관 이름으로 검색 (부분 일치)
    const results = records.filter((row: any) => 
      row['도서관명'].toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      return NextResponse.json(results.map((result: any) => ({
        libraryName: result['도서관명'],
        libraryCode: result['도서관코드'],
        address: result['주소'],
        homepage: result['홈페이지']
      })));
    } else {
      return NextResponse.json({ error: '검색 결과가 없습니다.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}