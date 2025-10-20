import { CONFIG } from "../config";

export function sanitizeHTML(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

export function validateMarkerInput(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== "string") {
    errors.push("Title is required");
  } else if (data.title.length > CONFIG.MAX_TITLE_LENGTH) {
    errors.push(
      `Title must be less than ${CONFIG.MAX_TITLE_LENGTH} characters`
    );
  }

  const validTypes = ["ICE", "PIG", "CHECKPOINT", "RAID", "OTHER"];
  if (!data.type || !validTypes.includes(data.type)) {
    errors.push(`Type must be one of: ${validTypes.join(", ")}`);
  }

  if (typeof data.description !== "string") {
    errors.push("Description must be a string");
  } else if (data.description.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
    errors.push(
      `Description must be less than ${CONFIG.MAX_DESCRIPTION_LENGTH} characters`
    );
  }

  if (!data.coords || !Array.isArray(data.coords) || data.coords.length !== 2) {
    errors.push("Invalid coordinates");
  } else {
    const [lng, lat] = data.coords;
    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      errors.push("Coordinates out of range");
    }
  }

  return { valid: errors.length === 0, errors };
}

export function sanitizeFilename(filename: string): string {
  // Remove directory traversal characters and sequences
  const sanitized = filename.replace(/(\.\.\/|~|\/|\\)/g, "");

  // Whitelist safe characters (alphanumeric, dots, underscores, hyphens)
  // and remove any others.
  const safeChars = sanitized.replace(/[^a-zA-Z0-9._-]/g, "");

  // Limit the length to prevent excessively long filenames
  const maxLength = 255;
  return safeChars.substring(0, maxLength);
}
