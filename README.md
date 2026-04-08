# Sky Shield

Sky Shield is a simple browser defense game built with plain **HTML, CSS, and JavaScript**.

## Game features

- Defend a city from waves of triangular drones.
- Click/tap to launch interceptors toward your selected point.
- City health drops when drones reach the buildings.
- Score increases for each intercepted drone.
- Difficulty increases every 20 points.
- Four power-ups:
  - **EMP Burst**: clears nearby drones.
  - **Radar Slow**: slows enemies for 3 seconds.
  - **Auto Battery**: auto-fires for 5 seconds.
  - **Repair Kit**: restores city health.
- Start screen + game over screen + restart button.
- Local high score with `localStorage`.
- Mobile-friendly tap controls.
- Clean minimalist visuals.
- Simple sound toggle.

## Project files

- `index.html` – game layout and UI panels.
- `style.css` – responsive minimalist styles.
- `script.js` – game logic, drawing, collisions, power-ups, scoring.
- `README.md` – setup + deployment guide.

## How to run locally

### Option 1 (quickest)
1. Download or clone this project.
2. Open `index.html` in your browser.

### Option 2 (recommended local server)
Use a small server so browser behavior matches production:

```bash
# If you have Python installed
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080`

## How to deploy to Netlify

### Deploy with drag-and-drop (easiest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag your project folder (or zipped folder contents) into the page.
3. Netlify will publish it and give you a live URL.

### Deploy from Git (recommended)
1. Push this project to GitHub/GitLab/Bitbucket.
2. In Netlify, click **Add new site** → **Import an existing project**.
3. Connect your repository.
4. Build settings for this project:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.`
5. Click **Deploy site**.

Because this is a static site, no build step is required.

## Tips for customization

- Change colors in `style.css` root variables.
- Tune difficulty in `script.js` by editing `spawnGap`, drone speed, and level math.
- Adjust power-up drop chance by changing `Math.random() < 0.14`.
