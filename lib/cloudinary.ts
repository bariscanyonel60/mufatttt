import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function getCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary yapılandırılmamış. CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ve CLOUDINARY_API_SECRET gerekli."
    );
  }

  if (!configured) {
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

export const CLOUDINARY_FOLDER = "mufat";

export type CloudinaryMedia = {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
};

export async function listCloudinaryMedia(): Promise<CloudinaryMedia[]> {
  const cld = getCloudinary();
  const res = await cld.api.resources({
    type: "upload",
    prefix: `${CLOUDINARY_FOLDER}/`,
    max_results: 100,
    resource_type: "image",
  });

  return (res.resources as Array<{
    public_id: string;
    secure_url: string;
    bytes: number;
    created_at: string;
  }>).map((r) => ({
    name: r.public_id,
    url: r.secure_url,
    size: r.bytes,
    updatedAt: r.created_at,
  }));
}

export async function uploadCloudinaryImage(
  buffer: Buffer,
  originalName: string
): Promise<{ name: string; url: string }> {
  const cld = getCloudinary();
  const base = originalName
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 60);

  const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        public_id: `${Date.now()}-${base || "image"}`,
        resource_type: "image",
        overwrite: false,
      },
      (err, uploaded) => {
        if (err || !uploaded) reject(err || new Error("Yükleme başarısız"));
        else resolve(uploaded as { public_id: string; secure_url: string });
      }
    );
    stream.end(buffer);
  });

  return { name: result.public_id, url: result.secure_url };
}

export async function deleteCloudinaryImage(publicId: string): Promise<void> {
  if (!publicId.startsWith(`${CLOUDINARY_FOLDER}/`)) {
    throw new Error("Geçersiz dosya.");
  }
  const cld = getCloudinary();
  await cld.uploader.destroy(publicId, { resource_type: "image" });
}

/** PDF / Word CV — stored under mufat/cvs (raw). */
export async function uploadCloudinaryCv(
  buffer: Buffer,
  originalName: string
): Promise<{ name: string; url: string }> {
  const cld = getCloudinary();
  const base = originalName
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 60);

  const result = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder: `${CLOUDINARY_FOLDER}/cvs`,
        public_id: `${Date.now()}-${base || "cv"}`,
        resource_type: "raw",
        overwrite: false,
      },
      (err, uploaded) => {
        if (err || !uploaded) reject(err || new Error("CV yükleme başarısız"));
        else resolve(uploaded as { public_id: string; secure_url: string });
      }
    );
    stream.end(buffer);
  });

  return { name: result.public_id, url: result.secure_url };
}
