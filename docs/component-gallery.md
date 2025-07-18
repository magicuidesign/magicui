# Component Gallery System

This document explains the component gallery system implemented for Magic UI.

## Overview

The component gallery provides a visual overview of all available components with preview images, making it easier for users to discover and browse components. Instead of directly navigating to a specific component page, users can see previews of all components and then navigate to the ones they're interested in.

## Features

- Grid layout of component cards
- Visual preview (thumbnail) for each component
- Component name, description, and tags
- Click to navigate to the full component documentation page

## How It Works

### 1. Component Registry

The system uses a central registry of components in `lib/capture-component-previews.ts`. This registry contains:

- Component ID
- Component name
- Path to the component documentation
- Path to the component preview image
- Tags (optional)
- Description (optional)

### 2. Preview Images

Preview images are stored in `/public/component-previews/`. These can be either:

- SVG placeholders (current implementation)
- Actual screenshots captured from rendered components

### 3. Screenshot Generation

For generating actual screenshots, there are two approaches:

#### Method 1: Manual Screenshots

Take screenshots of each component manually and save them to the preview directory.

#### Method 2: Automated Screenshots

Use the provided script that:
1. Runs a headless browser (Puppeteer/Playwright)
2. Visits each component page
3. Captures a screenshot of the rendered component
4. Saves the screenshot to the preview directory

The `scripts/generate-component-previews.js` file contains a script for automated screenshot generation.

## Adding a New Component to the Gallery

1. Add the component to the `componentsToCapture` array in `lib/capture-component-previews.ts`
2. Create a preview image (manually or using the screenshot generation script)
3. The component will automatically appear in the gallery

## Future Improvements

- Filtering components by tags
- Search functionality
- Categorization of components
- Automated preview generation during build process 