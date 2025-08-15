# Simple Recipe Finder 🍳

A modern, responsive web application built with Next.js that allows users to search for recipes from TheMealDB API.

## Features

### Core Functionality

- **Search Recipes**: Search by recipe name or ingredient
- **Recipe Details**: View detailed information including ingredients and cooking instructions
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Hover Effects**: Interactive recipe cards with smooth animations
- **Loading Animation**: Beautiful loading spinner during API calls
- **Error Handling**: User-friendly error messages

### Advanced Features

- **Favorites System**: Save and manage favorite recipes using LocalStorage
- **Dark Mode**: Toggle between light and dark themes (persisted)
- **Category Filters**: Filter recipes by meal type (Breakfast, Lunch, Dinner, etc.)
- **YouTube Integration**: Watch cooking videos when available
- **Ingredient Lists**: Properly formatted ingredient lists with measurements

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **API**: TheMealDB API
- **Storage**: Browser LocalStorage for favorites and theme preference

## Project Structure

```
src/
├── app/                     # Next.js app directory
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main homepage component
├── components/             # Reusable React components
│   ├── Header.tsx          # App header with theme toggle
│   ├── SearchBar.tsx       # Recipe search functionality
│   ├── FilterBar.tsx       # Category filters and favorites
│   ├── RecipeCard.tsx      # Individual recipe card
│   ├── RecipeModal.tsx     # Recipe details modal
│   └── LoadingSpinner.tsx  # Loading animation
├── hooks/                  # Custom React hooks
│   ├── useFavorites.ts     # Favorites management
│   └── useTheme.ts         # Theme management
├── lib/                    # Utility libraries
│   ├── api.ts              # TheMealDB API service
│   └── storage.ts          # LocalStorage utilities
└── types/                  # TypeScript type definitions
    └── recipe.ts           # Recipe-related types
```

## Component Architecture

### Reusable Components

1. **SearchBar**: Handles recipe search with type selection (name/ingredient)
2. **RecipeCard**: Displays recipe preview with favorite button and hover effects
3. **FilterBar**: Category filters and favorites toggle
4. **RecipeModal**: Full recipe details with ingredients and instructions
5. **LoadingSpinner**: Custom loading animation
6. **Header**: App branding with dark mode toggle

### Custom Hooks

- **useFavorites**: Manages favorite recipes state and LocalStorage persistence
- **useTheme**: Handles dark/light mode toggle and persistence

## API Integration

Uses TheMealDB API endpoints:

- Search by name: `/search.php?s={query}`
- Search by ingredient: `/filter.php?i={ingredient}`
- Get recipe details: `/lookup.php?i={id}`
- Filter by category: `/filter.php?c={category}`

## Styling & UX

- **Responsive Grid**: Adaptive layout from 1 to 4 columns based on screen size
- **Dark Mode**: Complete dark theme with smooth transitions
- **Animations**: CSS animations for loading, card hover effects, and modal transitions
- **Accessibility**: Proper ARIA labels, semantic HTML, and keyboard navigation
- **Performance**: Lazy loading for images and optimized re-renders

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Search Recipes**: Use the search bar to find recipes by name or ingredient
2. **Browse Categories**: Use filter buttons to browse specific meal types
3. **View Details**: Click on any recipe card to see full details
4. **Save Favorites**: Click the heart icon to save recipes to favorites
5. **Toggle Theme**: Use the theme toggle in the header for dark/light mode
6. **Watch Videos**: Click "Watch Video" in recipe details (when available)

## Features Implementation

### ✅ HTML & CSS

- Semantic HTML structure
- Tailwind CSS for styling
- Fully responsive design
- Hover effects on recipe cards
- Custom loading animations

### ✅ JavaScript & React Functionality

- Search bar with ingredient/dish name search
- TheMealDB API integration
- Recipe list with images and names
- Detailed recipe view with ingredients and instructions
- Error handling for failed searches

### ✅ React Requirements

- Functional components with hooks (useState, useEffect)
- Reusable components (RecipeCard, SearchBar, etc.)
- Clean folder structure with proper separation

### ✅ Extra Features

- Favorites system with LocalStorage
- Dark mode toggle with persistence
- Meal type filtering (Breakfast, Lunch, Dinner, etc.)
- YouTube video integration
- Smooth animations and transitions

## Code Quality

- **TypeScript**: Full type safety throughout the application
- **Clean Code**: Well-commented and organized codebase
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized API calls and state management
- **Accessibility**: ARIA labels and semantic HTML structure
