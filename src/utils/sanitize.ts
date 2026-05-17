
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
  const type = blob.type;

  if (type === 'image/jpeg' || type === 'image/jpg') {
    // Check JPEG signature
    if (dataView.getUint16(0, false) !== 0xFFD8) {
      return blob; // Not a JPEG
    }

    let offset = 2;
    while (offset < dataView.byteLength) {
      const marker = dataView.getUint16(offset, false);
      // FFE1 is APP1 (EXIF), FFE2-FFEF are other APP markers (which can contain metadata)
      if (marker >= 0xFFE1 && marker <= 0xFFEF) {
        const length = dataView.getUint16(offset + 2, false);
        const newBlob = new Blob([blob.slice(0, offset), blob.slice(offset + 2 + length)]);
        return stripExif(newBlob); // Recursively strip
      }
      if (marker === 0xFFDA) {
         break; // Start of Scan (image data)
      }
      offset += 2 + dataView.getUint16(offset + 2, false);
    }
  } else if (type === 'image/png') {
    // Check PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (dataView.getUint32(0, false) !== 0x89504E47 || dataView.getUint32(4, false) !== 0x0D0A1A0A) {
      return blob;
    }

    let offset = 8;
    const safeChunks = ['IHDR', 'PLTE', 'IDAT', 'IEND', 'tRNS', 'cHRM', 'gAMA', 'iCCP', 'sBIT', 'sRGB', 'bKGD', 'hIST', 'pHYs', 'sPLT'];
    let safeParts: Blob[] = [];
    let start = 0;

    while (offset < dataView.byteLength) {
      const length = dataView.getUint32(offset, false);
      const chunkType = String.fromCharCode(
        dataView.getUint8(offset + 4),
        dataView.getUint8(offset + 5),
        dataView.getUint8(offset + 6),
        dataView.getUint8(offset + 7)
      );

      // if chunk is eXIf, tEXt, zTXt, iTXt, we strip it
      if (!safeChunks.includes(chunkType)) {
        // add the preceding safe part to array
        safeParts.push(blob.slice(start, offset));
        start = offset + 12 + length; // skip this chunk
      }

      if (chunkType === 'IEND') {
        safeParts.push(blob.slice(start, offset + 12 + length));
        break;
      }

      offset += 12 + length;
    }

    return new Blob(safeParts, { type: 'image/png' });
  }

  return blob;
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}
