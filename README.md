# Orthoplay

Orthoplay is an educational spelling learning game.

## Project Structure
- `backend` – FastAPI server serving words from `words.json` (managed with [uv](https://github.com/astral-sh/uv))
- `frontend` – React app built with Vite and styled using Tailwind CSS (managed with npm)

## Getting Started

### Backend
```bash
cd backend
uv sync
python run.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## License
This project is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.