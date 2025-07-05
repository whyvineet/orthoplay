"""Application runner."""

import uvicorn

if __name__ == "__main__":
    print("Starting Orthoplay API...")
    print("Make sure to install required packages: pip install -r requirements.txt")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)