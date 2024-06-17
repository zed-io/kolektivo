#!/bin/sh

# ========================================
# Replace the branded name in translation locale files
# ========================================

# Flags:
# -b (Optional): Name of the branding to use: celo or valora (default)

branding=Kolektivo

# Get the branding name from the command line arguments
while getopts 'b:' flag; do
  case "${flag}" in
    b) branding="$OPTARG" ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

# Get the root directory of the mobile project
mobile_root="$(dirname "$(dirname "$0")")"

# Change the directory to the root directory of the localization files
cd "$mobile_root/locales"

# Get all the locale files in the locales directory which may be nested
locale_files=$(find . -type f -name '*.json')

# Replace the branded name in the locale files
for locale_file in $locale_files; do
  sed -i '' "s/Valora/$branding/g" "$locale_file"
done
