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

  if (!data.type || !["ICE", "PIG"].includes(data.type)) {
    errors.push("Type must be ICE or PIG");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("Description is required");
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
