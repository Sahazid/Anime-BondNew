# Anime Bond

A modern anime browsing and streaming frontend built with **React**,
**Vite**, and **Tailwind CSS**.

The application consumes the [Aniwixi Anime
API](https://github.com/Aniwixi/aniwixi-api) to fetch anime data, search
results, anime details, characters, episode lists, and streaming embed
links.

## Features

-   🎬 Browse trending anime
-   🔎 Search anime by title
-   📖 View detailed anime information
-   🖼️ Display anime posters, titles, synopsis, score, status, year, and
    characters
-   📺 Browse available episodes
-   ▶️ Watch episodes through embedded streaming players
-   🔗 Dynamic routes for anime details and episodes
-   📱 Responsive UI for different screen sizes
-   🎨 Dark-themed interface built with Tailwind CSS
-   ⚡ Fast development and production builds with Vite

## Tech Stack

### Frontend

-   React 19
-   React Router
-   Vite
-   Tailwind CSS 4
-   JavaScript (ES6+)
-   HTML5
-   Font Awesome

### API

This project uses the **Aniwixi API** for anime data and
streaming-related information.

API repository:

https://github.com/Aniwixi/aniwixi-api

The frontend communicates with the API using the browser `fetch()` API.

## API Endpoints Used

The current project uses the following Aniwixi API endpoints:

### Get Anime List

``` text
GET https://aniwixi.xyz/wp-json/aniwixi/v1/anime
```

Used on the home page to load the anime catalog.

### Search Anime

``` text
GET https://aniwixi.xyz/wp-json/aniwixi/v1/search?query={query}
```

Used by the search bar to find anime by title.

### Get Anime Details

``` text
GET https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/{id}
```

Used on the anime details page to retrieve information such as:

-   Anime title
-   Poster
-   Synopsis
-   Score
-   Status
-   Release year
-   Characters
-   Available episodes

### Get Episode Streaming Data

``` text
GET https://aniwixi.xyz/wp-json/aniwixi/v1/anilist/{id}/ep/{episodeNumber}
```

Used by the streaming page to retrieve the episode's player/embed URL.

## Application Routes

  Route                                 Purpose
  ------------------------------------- -----------------------------------------------
  `/`                                   Home page with hero section and anime catalog
  `/details/:id`                        Anime details page
  `/anime/:id/episode/:episodeNumber`   Episode streaming page

### Example Flow

The application follows this flow:

``` text
Home
  ↓
Anime Card
  ↓
/details/:id
  ↓
Anime Details + Episode List
  ↓
/anime/:id/episode/:episodeNumber
  ↓
Embedded Video Player
```

## Project Structure

``` text
my-Anime-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── component/
│   │   │   ├── AnimeInfo.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MainContent.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Streaming.jsx
│   │   │   └── Hero.css
│   │   │
│   │   └── heroImage/
│   │       ├── ichigo-kurosaki-5120x2880-27177.jpg
│   │       └── jujutsu-kaisen-1284x2778-27211.png
│   │
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── Layout.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation

### 1. Clone the repository

``` bash
git clone <your-repository-url>
```

### 2. Go to the project directory

``` bash
cd my-Anime-app
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the development server

``` bash
npm run dev
```

Vite will provide a local development URL, usually:

``` text
http://localhost:5173
```

## Available Scripts

### Development

``` bash
npm run dev
```

Starts the Vite development server.

### Production Build

``` bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

``` bash
npm run preview
```

Runs the production build locally for preview.

### Lint

``` bash
npm run lint
```

Checks the project using ESLint.

## How the Application Works

### 1. Home Page

The home page requests anime data from the API:

``` js
const animePromise = fetch(
  "https://aniwixi.xyz/wp-json/aniwixi/v1/anime"
).then((res) => res.json());
```

The returned data is passed to the hero/content components and displayed
as anime cards.

### 2. Search

The navigation bar sends the search query to the API:

``` js
fetch(
  `https://aniwixi.xyz/wp-json/aniwixi/v1/search?query=${search}`
);
```

Search results are displayed in a dropdown. Selecting an anime navigates
to:

``` text
/details/{animeId}
```

### 3. Anime Details

The details page reads the anime ID from the URL using React Router:

``` js
const { id } = useParams();
```

It then requests the anime information from the API and displays the
details and available episodes.

### 4. Episode Navigation

When a user selects an episode, the application navigates to:

``` text
/anime/{animeId}/episode/{episodeNumber}
```

The streaming component reads both parameters:

``` js
const { id, episodeNumber } = useParams();
```

It then requests the episode data and uses the returned embed URL inside
an `<iframe>`.

## Main Components

### `NavBar.jsx`

Handles:

-   Navigation
-   Anime search
-   Search results
-   Navigation to anime details

### `Hero.jsx`

Handles:

-   Hero/banner section
-   Featured visual content
-   Passing API data to the anime catalog

### `MainContent.jsx`

Handles:

-   Anime card rendering
-   Anime posters
-   Anime titles
-   Navigation to anime details

### `AnimeInfo.jsx`

Handles:

-   Anime details
-   Background/poster
-   Synopsis
-   Score
-   Status
-   Year
-   Characters
-   Episode list

### `Streaming.jsx`

Handles:

-   Episode parameters
-   Episode API request
-   Embedded video player

### `Layout.jsx`

Provides the shared application layout and navigation using React
Router's `Outlet`.

## React Router

The project uses React Router for client-side navigation.

Routes are configured in `App.jsx`:

``` js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "details/:id",
        element: <AnimeInfo />
      },
      {
        path: "/anime/:id/episode/:episodeNumber",
        element: <Streaming />
      }
    ]
  }
]);
```

This allows anime IDs and episode numbers to be passed through URL
parameters.

## Styling

The application uses **Tailwind CSS 4** for styling.

The Vite configuration includes the Tailwind Vite plugin:

``` js
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

The project uses a dark theme with custom Tailwind utility classes and a
Roboto font.

## Data Flow

``` text
Aniwixi API
     │
     ▼
React fetch()
     │
     ▼
Home / Search / Details / Streaming
     │
     ▼
React Components
     │
     ▼
Tailwind UI
```

## Important Notes

-   The application depends on the availability and response format of
    the Aniwixi API.
-   API responses may change over time.
-   Streaming availability depends on the API and its available sources.
-   This project is a frontend client and does not store anime data in
    its own database.
-   The project currently does not require a custom backend or
    environment variables.

## Future Improvements

Possible improvements for future versions:

-   🔐 User authentication
-   ❤️ Watchlist / Favorites
-   🕒 Continue watching
-   📚 Anime categories and genre filtering
-   🌙 Theme customization
-   ⏭️ Next/previous episode controls
-   🔔 Recently updated anime section
-   📊 Better loading and error states
-   📱 Improved mobile navigation
-   🎞️ Better video player controls
-   💾 Local storage for user preferences

## Credits

### Anime API

This project uses the **Aniwixi API**:

https://github.com/Aniwixi/aniwixi-api

### AniList

The API uses AniList-related anime identifiers/data. For information
about the official AniList API, see:

https://github.com/AniList/docs

## Disclaimer

This project is created for **learning and educational purposes**.

Anime metadata, images, and streaming information are provided by
external services. This project does not claim ownership of third-party
content.

## Author

**Sahazid**

-   GitHub: https://github.com/Sahazid
-   LinkedIn:
    https://www.linkedin.com/in/md-sahazid-hossen-sani-85a1ba274/
