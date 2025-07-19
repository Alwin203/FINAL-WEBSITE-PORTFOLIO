#!/bin/bash

# Image optimization script for prof_profile
# This script will optimize large images to reduce the deployment size

cd /Users/samir/development/prof_profile/public

echo "Starting image optimization..."

# Function to optimize an image
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    local quality="${3:-80}"
    local max_size="${4:-1920}"
    
    if [ -f "$input_file" ]; then
        echo "Optimizing: $input_file"
        magick "$input_file" -quality "$quality" -resize "${max_size}x${max_size}>" "$output_file"
        
        # Get file sizes
        original_size=$(stat -f%z "$input_file" 2>/dev/null || echo "0")
        new_size=$(stat -f%z "$output_file" 2>/dev/null || echo "0")
        
        if [ "$new_size" -lt "$original_size" ] && [ "$new_size" -gt "0" ]; then
            echo "✅ Reduced from $(numfmt --to=iec $original_size) to $(numfmt --to=iec $new_size)"
            rm "$input_file"
            mv "$output_file" "$input_file"
        else
            echo "❌ Optimization didn't reduce size, keeping original"
            rm "$output_file" 2>/dev/null
        fi
    fi
}

# Optimize PNG files to WebP (they compress much better)
find . -name "*.png" -size +1M | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .png)
    optimize_image "$file" "${dir}/${base}.webp" 80 1920
done

# Optimize large WebP files
find . -name "*.webp" -size +5M | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .webp)
    optimize_image "$file" "${dir}/${base}_temp.webp" 70 1920
done

# Optimize large JPEG files
find . -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
    if [ $(stat -f%z "$file") -gt 1048576 ]; then # > 1MB
        dir=$(dirname "$file")
        base=$(basename "$file")
        extension="${base##*.}"
        name="${base%.*}"
        optimize_image "$file" "${dir}/${name}_temp.${extension}" 80 1920
    fi
done

echo "Image optimization complete!"
echo "New total size:"
du -sh .
