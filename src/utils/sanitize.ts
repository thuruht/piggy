
export function sanitizeHTML(str: string): string {
  const sanitized = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return sanitized;
}

export function validateMarkerInput(body: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!body.title || typeof body.title !== 'string') {
    errors.push('Title is required and must be a string.');
  }
  if (!body.type || typeof body.type !== 'string') {
    errors.push('Type is required and must be a string.');
  }
  if (!body.coords || !Array.isArray(body.coords) || body.coords.length !== 2) {
    errors.push('Coordinates are required and must be an array of two numbers.');
  }
  return { valid: errors.length === 0, errors };
}

export async function stripExif(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  const dataView = new DataView(arrayBuffer);

  if (dataView.getUint16(0, false) !== 0xFFD8) {
    return blob; // Not a JPEG
  }

  let offset = 2;
  while (offset < dataView.byteLength) {
    if (dataView.getUint16(offset, false) === 0xFFE1) {
      const exifLength = dataView.getUint16(offset + 2, false);
      const newBlob = new Blob([blob.slice(0, offset), blob.slice(offset + exifLength)]);
      return newBlob;
    }
    offset += 2 + dataView.getUint16(offset + 2, false);
  }

  return blob;
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}
