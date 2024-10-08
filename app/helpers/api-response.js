import { NextResponse } from 'next/server';

export const executeApi = (handler) => async (req) => {
  try {
    const payload = await req.json();
    const data = await handler(req, payload); // Call the handler with the parsed data

    return NextResponse.json({
      type: 'success',
      data: data,
    });
  } catch (err) {
    return NextResponse.json(
      { type: 'error', message: err.message },
      {
        status: 500,
      }
    );
  }
};
