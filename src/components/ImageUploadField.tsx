import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  preview?: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  showRemove?: boolean;
}

const ImageUploadField = ({
  label,
  description,
  preview,
  onChange,
  required = false,
  showRemove = true,
}: ImageUploadFieldProps) => (
  <div className="space-y-3">
    <div>
      <p className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>

    {preview ? (
      <div className="flex items-center justify-between rounded-xl border bg-muted/20 p-3">
        <img
          src={preview}
          alt={`${label} preview`}
          className="size-20 rounded-lg border bg-background object-contain"
        />
        <div className="flex flex-wrap justify-end gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent">
            <RefreshCw className="size-4" /> Replace
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="sr-only"
              onChange={(event) =>
                onChange(event.currentTarget.files?.[0] || null)
              }
            />
          </label>
          {showRemove && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChange(null);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="size-4" /> Remove
            </button>
          )}
        </div>
      </div>
    ) : (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-7 text-center transition hover:bg-accent">
        <span className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
          <ImagePlus className="size-5" />
        </span>
        <span className="text-sm font-medium">Choose image</span>
        <span className="text-xs text-muted-foreground">
          PNG, JPG, WEBP or SVG. Maximum 5 MB.
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="sr-only"
          onChange={(event) =>
            onChange(event.currentTarget.files?.[0] || null)
          }
        />
      </label>
    )}
  </div>
);

export default ImageUploadField;
